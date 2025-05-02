import 'dart:convert';

import 'package:complaint_management_system/constant/colors.dart';
import 'package:complaint_management_system/widgets/profile_box_tile.dart';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import '../constant/env.dart' as env;

class UserProfilePage extends StatefulWidget {
  String email;
  String userId;
  UserProfilePage({super.key, required this.email, required this.userId});

  @override
  State<UserProfilePage> createState() => _UserProfilePageState();
}

class _UserProfilePageState extends State<UserProfilePage> {
  String _title = "Unknown User";
  final TextEditingController _controller = TextEditingController();
  late Future<Map<String, dynamic>> userData;
  @override
  void initState() {
    super.initState();
    userData = getUserDetails(widget.userId);
  }

  final List<Map<String, dynamic>> _complaintDetails = [
    {
      "icon": Icons.border_all_rounded,
      "title": "20 Complaints",
    },
    {
      "icon": Icons.done_all_rounded,
      "title": "5 Complaints",
    },
    {
      "icon": Icons.cancel_outlined,
      "title": "3 Complaints",
    },
    {
      "icon": Icons.pending_actions_rounded,
      "title": "12 Complaints",
    },
  ];

  Future<Map<String, dynamic>> getUserDetails(String userId) async {
    try {
      final response = await http
          .get(Uri.parse('http://${env.IP_ADDRESS}:8080/user/$userId'));

      if (response.statusCode == 200) {
        final Map<String, dynamic> data = json.decode(response.body);

        // Ensure the response contains an 'image' field
        if (!data.containsKey("image") || data["image"] == null) {
          data["image"] = []; // Assign an empty list if images are missing
        }

        return data;
      } else {
        throw Exception("Failed to load user details: ${response.statusCode}");
      }
    } catch (e) {
      print("Error loading user details: $e");
      throw Exception("Failed to load user details");
    }
  }

  //update profile name
  Future<void> updateUserName(String userId, String newUserName) async {
    final url = Uri.parse("http://${env.IP_ADDRESS}:8080/update-user/$userId");

    try {
      final response = await http.put(
        url,
        headers: {'Content-Type': 'application/json; charset=UTF-8'},
        body: jsonEncode({"userName": newUserName}),
      );

      if (response.statusCode == 200) {
        print("User name updated successfully!");
      } else {
        print("Failed to update user name.");
      }
    } catch (e) {
      print("Error updating user name: $e");
    }
  }

  void _editTitle() {
    _controller.text = _title;
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return Dialog(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10),
          ),
          child: Container(
            width: MediaQuery.of(context).size.width * 0.8,
            padding: EdgeInsets.all(16.0),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  'Edit Title',
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                SizedBox(height: 10),
                TextFormField(
                  controller: _controller,
                  decoration: InputDecoration(
                    labelText: 'Title',
                    border: OutlineInputBorder(),
                  ),
                ),
                SizedBox(height: 20),
                ElevatedButton(
                  onPressed: () async {
                    final newTitle = _controller.text;
                    if (newTitle.isNotEmpty) {
                      await updateUserName(widget.userId, newTitle);

                      setState(() {
                        _title = newTitle; // Update the UI
                      });

                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(
                            content: Text("Profile updated successfully!")),
                      );

                      Navigator.of(context).pop(); // Close the dialog
                    } else {
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(content: Text("Please enter a name")),
                      );
                    }
                  },
                  child: Text('Submit'),
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: userData,
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return Center(child: CircularProgressIndicator());
        } else if (snapshot.hasError) {
          return Center(child: Text('Error: ${snapshot.error}'));
        } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
          return Center(child: Text('User not found'));
        } else {
          final user = snapshot.data!;
          return Scaffold(
            appBar: AppBar(
              flexibleSpace: Image(
                  image: AssetImage("assets/images/background.png"),
                  fit: BoxFit.cover),
              title: Text(
                "Profile",
                style: TextStyle(
                  fontWeight: FontWeight.w900,
                ),
              ),
            ),
            body: Stack(
              children: [
                Container(
                  width: double.infinity,
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.only(
                      bottomLeft: Radius.circular(60),
                      bottomRight: Radius.circular(60),
                    ),
                    image: DecorationImage(
                        image: AssetImage("assets/images/background.png"),
                        fit: BoxFit.cover),
                  ),
                ),
                SingleChildScrollView(
                  child: Padding(
                    padding: const EdgeInsets.all(25.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Center(
                          child: ClipRRect(
                            borderRadius: BorderRadius.circular(100),
                            child: user['image'] != null &&
                                    user['image'].isNotEmpty
                                ? Image.network(
                                    user['image'][0][
                                        'url'], // Displays the first image if available
                                    width: 150,
                                  )
                                : Icon(
                                    Icons
                                        .account_circle, // Placeholder icon when no image exists
                                    size: 150,
                                    color: Colors.grey,
                                  ),
                          ),
                        ),

                        SizedBox(
                          height: 20,
                        ),
                        //your name
                        Center(
                          child: Text(
                            user["userName"],
                            style: TextStyle(
                              fontWeight: FontWeight.bold,
                              fontSize: 20,
                            ),
                            textAlign: TextAlign.center,
                          ),
                        ),

                        //your email address
                        Center(
                          child: Text(
                            user["email"],
                            style: TextStyle(
                              fontWeight: FontWeight.normal,
                              fontSize: 16,
                            ),
                            textAlign: TextAlign.center,
                          ),
                        ),

                        SizedBox(
                          height: 20,
                        ),
                        //edit button
                        Center(
                          child: ElevatedButton(
                            style: ElevatedButton.styleFrom(
                                backgroundColor: mainColor,
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(8),
                                )),
                            onPressed: _editTitle,
                            child: Text(
                              "Edit Profile",
                              style: TextStyle(color: Colors.white),
                            ),
                          ),
                        ),

                        SizedBox(
                          height: 30,
                        ),

                        //Your Details
                        Text(
                          "My Details",
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 19,
                            color: const Color.fromARGB(255, 135, 54, 43),
                          ),
                          textAlign: TextAlign.start,
                        ),

                        ProfileBoxTile(
                            icon: Icons.phone,
                            title: user["phoneNumber"].toString()),
                        ProfileBoxTile(
                            icon: Icons.location_on_outlined,
                            title: user["address"].toString()),

                        SizedBox(
                          height: 30,
                        ),

                        //Your Complaints Details
                        Text(
                          "Complaints Details Summery",
                          style: TextStyle(
                              fontWeight: FontWeight.bold,
                              fontSize: 19,
                              color: const Color.fromARGB(255, 135, 54, 43)),
                          textAlign: TextAlign.start,
                        ),
                        ListView.builder(
                            shrinkWrap: true,
                            itemCount: _complaintDetails.length,
                            itemBuilder: (context, index) {
                              return ProfileBoxTile(
                                icon: _complaintDetails[index]['icon'],
                                title: _complaintDetails[index]['title'],
                              );
                            })
                      ],
                    ),
                  ),
                )
              ],
            ),
          );
        }
      },
    );
  }
}
