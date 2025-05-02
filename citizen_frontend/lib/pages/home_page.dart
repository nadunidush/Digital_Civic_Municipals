import 'package:complaint_management_system/constant/colors.dart';
import 'package:complaint_management_system/pages/all_complaints_page.dart';
import 'package:complaint_management_system/pages/complete_complaint_page.dart';
import 'package:complaint_management_system/pages/file_form_complaint.dart';
import 'package:complaint_management_system/pages/notifications_page.dart';
import 'package:complaint_management_system/pages/user_profile_page.dart';
import 'package:complaint_management_system/widgets/home_catogory_widget.dart';
import 'package:flutter/material.dart';

class HomePage extends StatefulWidget {
  String email;
  String userId;
  String userName;
  HomePage(
      {super.key,
      required this.email,
      required this.userId,
      required this.userName});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final TextEditingController _searchController = TextEditingController();
  final FocusNode _focusNode = FocusNode();
  final List<String> categories = [
    'Create Complaint',
    'All Complaint',
    'Notification',
    'profile',
    'Finished Complaints'
  ];
  List<String> _filteredCategories = [];
  bool _showCategories = false;

  @override
  void initState() {
    super.initState();
    _filteredCategories = List.from(categories);

    // Listen for focus changes
    _focusNode.addListener(() {
      if (_focusNode.hasFocus) {
        setState(() {
          _showCategories = true;
        });
      }
    });
  }

  void _filterCategories(String query) {
    setState(() {
      if (query.isEmpty) {
        _filteredCategories = List.from(categories);
      } else {
        _filteredCategories = categories
            .where((category) =>
                category.toLowerCase().contains(query.toLowerCase()))
            .toList();
      }
    });
  }

  void _hideCategories() {
    setState(() {
      _showCategories = false;
      _focusNode.unfocus();
    });
  }

  void _navigateToPage(String query) {
    if (query.toLowerCase() == 'create complaint') {
      Navigator.push(
          context,
          MaterialPageRoute(
              builder: (context) => FileFormComplaint(
                    email: widget.email,
                    userId: widget.userId,
                  ))).then((_) => _hideCategories());
    } else if (query.toLowerCase() == 'all complaints') {
      Navigator.push(
          context,
          MaterialPageRoute(
              builder: (context) => AllComplaintsPage(
                    userId: widget.userId,
                  ))).then((_) => _hideCategories());
    } else if (query.toLowerCase() == 'notification') {
      Navigator.push(context,
              MaterialPageRoute(builder: (context) => NotificationsPage(userId: widget.userId,)))
          .then((_) => _hideCategories());
    } else if (query.toLowerCase() == 'finished complaints') {
      Navigator.push(
          context,
          MaterialPageRoute(
              builder: (context) => CompleteComplaintPage(
                    userId: widget.userId,
                  ))).then((_) => _hideCategories());
    } else if (query.toLowerCase() == 'profile') {
      Navigator.push(
          context,
          MaterialPageRoute(
              builder: (context) => UserProfilePage(
                    email: widget.email,
                    userId: widget.userId,
                  ))).then((_) => _hideCategories());
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Not Found'),
        ),
      );
    }
  }

  @override
  void dispose() {
    _searchController.dispose();
    _focusNode.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: () async {
        if (_showCategories) {
          _hideCategories();
          return false;
        }
        return true;
      },
      child: GestureDetector(
        onTap: _hideCategories,
        behavior: HitTestBehavior.opaque,
        child: Scaffold(
          body: GestureDetector(
            onTap: () => FocusScope.of(context).unfocus(),
            child: SingleChildScrollView(
              child: Stack(
                children: [
                  Container(
                    color: mainColor,
                    width: double.infinity,
                    height: MediaQuery.of(context).size.height,
                  ),
                  Container(
                    width: double.infinity,
                    height: 270,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.only(
                        bottomLeft: Radius.circular(60),
                        bottomRight: Radius.circular(60),
                      ),
                      image: DecorationImage(
                          image: AssetImage("assets/images/background.png"),
                          fit: BoxFit.cover),
                    ),
                    child: Column(
                      children: [
                        const SizedBox(
                          height: 40,
                        ),
                        // Your name
                        Text(
                          "Hello ${widget.userName}",
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                        const SizedBox(
                          height: 10,
                        ),

                        // Logo Name
                        Text(
                          "DigitalCivic",
                          style: TextStyle(
                            fontSize: 28,
                            fontWeight: FontWeight.bold,
                            color: mainColor,
                          ),
                        ),

                        const SizedBox(
                          height: 20,
                        ),
                      ],
                    ),
                  ),

                  // Categories
                  Padding(
                    padding:
                        const EdgeInsets.only(top: 300, left: 20, right: 20),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            GestureDetector(
                              onTap: () {
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                    builder: (context) => FileFormComplaint(
                                      email: widget.email,
                                      userId: widget.userId,
                                    ),
                                  ),
                                );
                              },
                              child: HomeCatogoryWidget(
                                  image: "assets/iconImages/complaint.png",
                                  title: "Create Complaint"),
                            ),
                            GestureDetector(
                              onTap: () {
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                    builder: (context) => AllComplaintsPage(
                                      userId: widget.userId,
                                    ),
                                  ),
                                );
                              },
                              child: HomeCatogoryWidget(
                                  image: "assets/iconImages/all.png",
                                  title: "All Complaints"),
                            ),
                          ],
                        ),
                        const SizedBox(
                          height: 20,
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            GestureDetector(
                              onTap: () {
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                    builder: (context) => NotificationsPage(userId: widget.userId,),
                                  ),
                                );
                              },
                              child: HomeCatogoryWidget(
                                  image: "assets/iconImages/notifications.png",
                                  title: "Notifications"),
                            ),
                            GestureDetector(
                              onTap: () {
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                    builder: (context) => CompleteComplaintPage(
                                      userId: widget.userId,
                                    ),
                                  ),
                                );
                              },
                              child: HomeCatogoryWidget(
                                  image: "assets/iconImages/complete.png",
                                  title: "Finished Complaints"),
                            ),
                          ],
                        ),
                        const SizedBox(
                          height: 20,
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            GestureDetector(
                              onTap: () {
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                    builder: (context) => UserProfilePage(
                                      email: widget.email,
                                      userId: widget.userId,
                                    ),
                                  ),
                                );
                              },
                              child: HomeCatogoryWidget(
                                  image: "assets/iconImages/profile.png",
                                  title: "Profile"),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                  // Search functionality
                  Padding(
                    padding:
                        const EdgeInsets.only(top: 160.0, left: 20, right: 20),
                    child: Column(
                      children: [
                        Container(
                          decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.circular(8.0),
                            boxShadow: [
                              BoxShadow(
                                color: Colors.grey.withOpacity(0.5),
                                spreadRadius: 2,
                                blurRadius: 5,
                                offset: const Offset(0, 3),
                              ),
                            ],
                          ),
                          child: TextFormField(
                            controller: _searchController,
                            focusNode: _focusNode,
                            decoration: InputDecoration(
                              hintText: 'What do you need...',
                              prefixIcon: Icon(
                                Icons.search,
                                size: 33,
                                color: secondaryColor,
                              ),
                              suffixIcon: IconButton(
                                icon: Icon(Icons.send),
                                onPressed: () {
                                  if (_searchController.text.isNotEmpty) {
                                    final matchingCategory =
                                        _filteredCategories.firstWhere(
                                            (category) =>
                                                category.toLowerCase() ==
                                                _searchController.text
                                                    .toLowerCase(),
                                            orElse: () => '');
                                    if (matchingCategory.isNotEmpty) {
                                      _navigateToPage(matchingCategory);
                                    } else {
                                      ScaffoldMessenger.of(context)
                                          .showSnackBar(
                                        SnackBar(
                                          content: Text('Category not found!'),
                                        ),
                                      );
                                    }
                                  }
                                },
                              ),
                              border: InputBorder.none,
                              contentPadding:
                                  const EdgeInsets.symmetric(vertical: 16.0),
                            ),
                            onChanged: _filterCategories,
                          ),
                        ),
                        const SizedBox(height: 16.0),
                        if (_showCategories)
                          Container(
                            height:
                                _filteredCategories.length < categories.length
                                    ? 70.0 * _filteredCategories.length
                                    : 300.0, // Adjust height dynamically
                            decoration: BoxDecoration(
                              color: Colors.white,
                              borderRadius: BorderRadius.circular(8.0),
                              boxShadow: [
                                BoxShadow(
                                  color: Colors.grey.withOpacity(0.5),
                                  spreadRadius: 2,
                                  blurRadius: 5,
                                  offset: const Offset(0, 3),
                                ),
                              ],
                            ),
                            child: ListView.builder(
                              itemCount: _filteredCategories.length,
                              itemBuilder: (context, index) {
                                final category = _filteredCategories[index];
                                return ListTile(
                                  title: Text(category),
                                  onTap: () {
                                    _navigateToPage(category);
                                  },
                                );
                              },
                            ),
                          ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
