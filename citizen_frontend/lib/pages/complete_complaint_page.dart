import 'package:complaint_management_system/constant/env.dart' as env;
import 'package:complaint_management_system/widgets/complete_complaint_widget.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class CompleteComplaintPage extends StatefulWidget {
  final String userId;
  const CompleteComplaintPage({super.key, required this.userId});

  @override
  State<CompleteComplaintPage> createState() => _CompleteComplaintPageState();
}

class _CompleteComplaintPageState extends State<CompleteComplaintPage> {
  List<Map<String, dynamic>> completedComplaints = [];
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    fetchCompletedComplaints();
  }

  Future<void> fetchCompletedComplaints() async {
    final url = Uri.parse(
        'http://${env.IP_ADDRESS}:8080/completed-complaints/${widget.userId}');

    try {
      final response = await http.get(url);

      if (response.statusCode == 200) {
        setState(() {
          completedComplaints =
              List<Map<String, dynamic>>.from(json.decode(response.body));
          isLoading = false;
        });
      } else {
        throw Exception("Failed to load complaints");
      }
    } catch (error) {
      print("Error fetching completed complaints: $error");
      setState(() {
        isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: isLoading
          ? Center(child: CircularProgressIndicator())
          : completedComplaints.isEmpty
              ? Center(child: Text("No completed complaints found."))
              : ListView.builder(
                  itemCount: completedComplaints.length,
                  itemBuilder: (context, index) {
                    final complaint = completedComplaints[index];

                    return CompleteComplaintWidget(
                      title: complaint['title'],
                      description: complaint['description'],
                      userId: widget.userId,
                      completionId: complaint['completionId'],
                      url: complaint['url'],
                      departmentName: complaint['departmentName'],
                      complaintStatus: complaint['complaintStatus'],
                      images: complaint['completionImages']
                              ?.map<String>((file) => file['url'].toString())
                              .toList() ??
                          [],
                    );
                  },
                ),
    );
  }
}
