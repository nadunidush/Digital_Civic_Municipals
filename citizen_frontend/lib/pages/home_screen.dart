import 'package:complaint_management_system/constant/colors.dart';
import 'package:complaint_management_system/pages/file_form_complaint.dart';
import 'package:complaint_management_system/pages/home_page.dart';
import 'package:complaint_management_system/pages/notifications_page.dart';
import 'package:complaint_management_system/pages/user_profile_page.dart';
import 'package:flutter/material.dart';

class HomeScreen extends StatefulWidget {
  String email;
  String userName;
  String userId;
  HomeScreen({super.key, required this.email, required this.userId, required this.userName});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _currentIndex = 0;
  List<Widget> _pages = [];

  // Define the pages for each bottom navigation tab
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    _pages = [
      HomePage(
        email: widget.email,
        userName:widget.userName,
        userId: widget.userId,
      ),
      FileFormComplaint(
        email: widget.email,
        userId: widget.userId,
      ),
      NotificationsPage(userId: widget.userId,),
      UserProfilePage(
        email: widget.email,
        userId: widget.userId,
      ),
    ];
  }

  void _onTabTapped(int index) {
    setState(() {
      _currentIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _pages[_currentIndex], // Display the selected page
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: _onTabTapped,
        selectedItemColor: secondaryColor, // Set the selected icon color
        unselectedItemColor: Colors.grey, // Set the unselected icon color
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: 'Home',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.add),
            label: 'Complaint',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.notifications),
            label: 'Notifications',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person),
            label: 'Profile',
          ),
        ],
      ),
    );
  }
}
