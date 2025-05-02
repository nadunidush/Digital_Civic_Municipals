import 'dart:convert';

import 'package:complaint_management_system/constant/env.dart' as env;
import 'package:complaint_management_system/widgets/all_complaint_widget.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class AllComplaintsPage extends StatefulWidget {
  final String userId; 
  const AllComplaintsPage({super.key, required this.userId});

  @override
  State<AllComplaintsPage> createState() => _AllComplaintsPageState();
}

class _AllComplaintsPageState extends State<AllComplaintsPage> {
  List<Map<String, dynamic>> complaints = []; // List to store complaints
  bool isLoading = true; // Loading state

  @override
  void initState() {
    super.initState();
    fetchComplaints(); // Fetch complaints on initialization
  }

  Future<void> fetchComplaints() async {
    final url = Uri.parse('http://${env.IP_ADDRESS}:8080/citizen-complaints/${widget.userId}'); // Replace with your backend URL

    try {
      final response = await http.get(url);

      if (response.statusCode == 200) {
        setState(() {
          complaints = List<Map<String, dynamic>>.from(json.decode(response.body));
          isLoading = false;
        });
      } else {
        throw Exception("Failed to load complaints");
      }
    } catch (error) {
      print("Error fetching complaints: $error");
      setState(() {
        isLoading = false;
      });
    }
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: Padding(
        padding: const EdgeInsets.all(23.0),
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                "All Complaints",
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 25,
                ),
              ),
              isLoading
                  ? Center(child: CircularProgressIndicator()) // Show a loading spinner
                  : complaints.isEmpty
                      ? Center(child: Text("No complaints found."))
                      : Column(
                          children: complaints.map((complaint) {
                            return AllComplaintWidget(
                              title: complaint['title'], // Complaint title
                              images: complaint['files']
                                      ?.map<String>((file) => file['url'].toString())
                                      .toList() ??
                                  [],// Complaint images
                              url: complaint['url'], // Complaint URL
                              description: complaint['description'], // Complaint description
                              pLevel: complaint['pLevel'], // Complaint priority level
                              departmentName: complaint['departmentName'], // Complaint department name
                              complaintStatus: complaint['status'], // Complaint status
                            );
                          }).toList(),
                        ),
            ],
          ),
        ),
      ),
    );
  }
}
