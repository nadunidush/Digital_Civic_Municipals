import 'dart:convert';

import 'package:complaint_management_system/constant/colors.dart';
import 'package:complaint_management_system/constant/env.dart' as env;
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class CompleteComplaintWidget extends StatefulWidget {
  final String title;
  final String url;
  final String description;
  final String userId;
  final String completionId;
  final String departmentName;
  final String complaintStatus;
  final List<String> images;
  CompleteComplaintWidget(
      {super.key,
      required this.title,
      required this.description,
      required this.departmentName,
      required this.complaintStatus,
      required this.images,
      required this.url,
      required this.userId,
      required this.completionId});

  @override
  State<CompleteComplaintWidget> createState() =>
      _CompleteComplaintWidgetState();
}

class _CompleteComplaintWidgetState extends State<CompleteComplaintWidget> {
  int currentIndex = 0; // State variable to track current image index

  void showNextImage() {
    setState(() {
      currentIndex = (currentIndex + 1) %
          widget.images.length; // Move to next image recursively
    });
  }

  void showPreviousImage() {
    setState(() {
      currentIndex = (currentIndex - 1 + widget.images.length) %
          widget.images.length; // Move to previous image recursively
    });
  }

  //submit feedbacks
  Future<void> submitFeedback(
      String completionComplaintId, String userId, String description) async {
    final url = Uri.parse("http://${env.IP_ADDRESS}:8080/submit-feedback");

    try {
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json; charset=UTF-8'},
        body: jsonEncode({
          "completionComplaintId": completionComplaintId,
          "userId": userId,
          "description": description,
        }),
      );

      if (response.statusCode == 201) {
        print("Feedback submitted successfully!");
      } else {
        print("Failed to submit feedback.");
      }
    } catch (e) {
      print("Error submitting feedback: $e");
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        SizedBox(
          height: 20,
        ),
        Padding(
          padding: const EdgeInsets.all(16.0),
          child: Container(
            padding: EdgeInsets.all(18),
            width: double.infinity,
            decoration: BoxDecoration(
              color: Colors.grey.shade200,
              borderRadius: BorderRadius.circular(20),
              boxShadow: [
                BoxShadow(
                  color: Colors.grey.withOpacity(0.4),
                  spreadRadius: 3,
                  blurRadius: 0.5,
                  //offset: Offset(0, 3), // changes position of shadow
                ),
              ],
            ),
            child: Column(
              children: [
                //Complaint title
                Text(
                  "${widget.title}",
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    color: mainColor,
                  ),
                  textAlign: TextAlign.center,
                ),

                SizedBox(
                  height: 15,
                ),
                //Complaint Image
                Stack(
                  children: [
                    Image.network(
                      widget.images[currentIndex],
                      width: 250,
                      height: 250,
                      fit: BoxFit.cover,
                    ),

                    // Left Icon
                    Positioned(
                      left: 0,
                      top: 100,
                      child: GestureDetector(
                        onTap: showPreviousImage,
                        child: Icon(
                          Icons.arrow_left,
                          color: const Color.fromARGB(255, 159, 234, 255),
                          size: 60,
                        ),
                      ),
                    ),

                    // Right Icon
                    Positioned(
                      right: 0,
                      top: 100,
                      child: GestureDetector(
                        onTap: showNextImage,
                        child: Icon(
                          Icons.arrow_right_outlined,
                          color: const Color.fromARGB(255, 159, 234, 255),
                          size: 60,
                        ),
                      ),
                    ),
                  ],
                ),

                SizedBox(
                  height: 10,
                ),
                //Complaint Description
                Text(
                  widget.description,
                  style: TextStyle(
                    fontSize: 13,
                  ),
                  textAlign: TextAlign.justify,
                ),

                SizedBox(
                  height: 15,
                ),

                //Location
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: [
                    Text(
                      "Location: ",
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: Color(0xff23B381),
                        fontSize: 16,
                      ),
                    ),
                    SizedBox(
                      width: 37,
                    ),
                    Expanded(
                      child: Text(
                        widget.url,
                        overflow: TextOverflow.visible,
                      ),
                    )
                  ],
                ),

                SizedBox(
                  height: 5,
                ),
                //Priority Level
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: [
                    Text(
                      "Department:",
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: Color(0xff23B381),
                        fontSize: 16,
                      ),
                    ),
                    SizedBox(
                      width: 10,
                    ),
                    Expanded(
                      child: Text(
                        widget.departmentName,
                        overflow: TextOverflow.visible,
                        style: TextStyle(fontWeight: FontWeight.bold),
                      ),
                    )
                  ],
                ),

                SizedBox(
                  height: 5,
                ),
                //department
                Row(
                  children: [
                    Text(
                      "Status: ",
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: Color(0xff23B381),
                        fontSize: 16,
                      ),
                    ),
                    SizedBox(
                      width: 12,
                    ),
                    Expanded(
                      child: Text(
                        widget.complaintStatus,
                        overflow: TextOverflow.visible,
                        style: TextStyle(
                          fontWeight: FontWeight.normal,
                          fontSize: 14,
                        ),
                      ),
                    )
                  ],
                ),

                SizedBox(
                  height: 8,
                ),

                //Create Feedback Button
                ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: secondaryColor,
                    foregroundColor: Colors.white,
                    textStyle: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  onPressed: () {
                    showDialog(
                      context: context,
                      builder: (BuildContext context) {
                        TextEditingController feedbackController =
                            TextEditingController();
                        return Dialog(
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(10),
                          ),
                          child: Container(
                            width: 600, // Adjust the width as needed
                            padding: EdgeInsets.all(16.0),
                            child: Column(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                Text(
                                  'What You think About Our Completion',
                                  style: TextStyle(
                                    fontSize: 20,
                                    fontWeight: FontWeight.bold,
                                  ),
                                  textAlign: TextAlign.center,
                                ),
                                SizedBox(height: 10),
                                Text(
                                  'Your input is valuable in helping us better understand  your needs and tailor our service accordingly.',
                                  style: TextStyle(
                                    fontSize: 12,
                                    fontWeight: FontWeight.normal,
                                  ),
                                  textAlign: TextAlign.center,
                                ),
                                SizedBox(height: 10),
                                TextFormField(
                                  controller: feedbackController,
                                  decoration: InputDecoration(
                                    labelText: 'Message',
                                    border: OutlineInputBorder(),
                                  ),
                                  maxLines: null,
                                  keyboardType: TextInputType.multiline,
                                ),
                                SizedBox(height: 20),
                                Container(
                                  width: 180,
                                  decoration: BoxDecoration(
                                    borderRadius: BorderRadius.circular(8),
                                    gradient: LinearGradient(
                                        colors: [
                                          Color(0xff00C853),
                                          Color(0xffB2FF59)
                                        ],
                                        begin: Alignment.centerLeft,
                                        end: Alignment.centerRight),
                                  ),
                                  child: ElevatedButton(
                                    style: ElevatedButton.styleFrom(
                                      shape: RoundedRectangleBorder(
                                        side: BorderSide.none,
                                        //borderRadius: BorderRadius.circular(20),
                                      ),
                                      backgroundColor: Colors.transparent,
                                      shadowColor: Colors.transparent,
                                      foregroundColor: Colors.white,
                                    ),
                                    onPressed: () async {
                                      final feedbackText =
                                          feedbackController.text;
                                      if (feedbackText.isNotEmpty) {
                                        await submitFeedback(
                                          widget.completionId,
                                          widget.userId,
                                          feedbackText,
                                        );

                                        ScaffoldMessenger.of(context)
                                            .showSnackBar(
                                          SnackBar(
                                              content: Text(
                                                  "Feedback submitted successfully!")),
                                        );

                                        Navigator.pop(
                                            context); // Close the dialog
                                      } else {
                                        ScaffoldMessenger.of(context)
                                            .showSnackBar(
                                          SnackBar(
                                              content: Text(
                                                  "Please enter your feedback")),
                                        );
                                      }
                                    },
                                    child: Text(
                                      "Submit",
                                      style: TextStyle(
                                          fontWeight: FontWeight.bold,
                                          fontSize: 16,
                                          color: Colors.purple),
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        );
                      },
                    );
                  },
                  child: Text("Create Feedback"),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}
