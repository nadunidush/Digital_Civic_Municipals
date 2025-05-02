import 'dart:convert';

import 'package:complaint_management_system/constant/colors.dart';
import 'package:complaint_management_system/constant/env.dart' as env;
import 'package:complaint_management_system/widgets/notification_box_widget.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class NotificationsPage extends StatefulWidget {
  final String userId;
  const NotificationsPage({super.key, required this.userId});

  @override
  State<NotificationsPage> createState() => _NotificationsPageState();
}

class _NotificationsPageState extends State<NotificationsPage> {
  Future<List<Map<String, dynamic>>> fetchReportData(String userId) async {
    final url =
        Uri.parse("http://${env.IP_ADDRESS}:8080/notifications/$userId");

    try {
      final response = await http.get(url);

      if (response.statusCode == 200) {
        return List<Map<String, dynamic>>.from(jsonDecode(response.body));
      } else {
        print("Failed to fetch reports");
        return [];
      }
    } catch (e) {
      print("Error fetching reports: $e");
      return [];
    }
  }

  List<Map<String, dynamic>> reportData = [];
  bool isLoading = true;
  bool showBlueCircle = true;

  @override
  void initState() {
    super.initState();
    fetchReportData(widget.userId).then((data) {
      setState(() {
        reportData = data;
        isLoading = false;
        showBlueCircle = false;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        flexibleSpace: Image(
            image: AssetImage("assets/images/background.png"),
            fit: BoxFit.cover),
        title: Text(
          "Notifications",
          style: TextStyle(
            fontWeight: FontWeight.w900,
          ),
        ),
      ),
      body: Stack(
        children: [
          Container(
            width: double.infinity,
            height: MediaQuery.of(context).size.height,
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
          isLoading
              ? Center(child: CircularProgressIndicator())
              : reportData.isEmpty
                  ? Center(child: Text("No reports available"))
                  : SingleChildScrollView(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Padding(
                            padding: const EdgeInsets.all(20.0),
                            child: Text(
                              "Today",
                              style: TextStyle(
                                  fontSize: 20, fontWeight: FontWeight.bold),
                            ),
                          ),
                          ...reportData.map((report) => NotificationBoxWidget(
                                showBlueCircle: showBlueCircle,
                                complaintTitle: report['complaintTitle'],
                                complaintDescription:
                                    report['complaintDescription'],
                                complaintStatus: report['complaintStatus'],
                              )),
                        ],
                      ),
                    ),
        ],
      ),
    );
  }
}
