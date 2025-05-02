import 'package:complaint_management_system/constant/colors.dart';
import 'package:flutter/material.dart';

class NotificationBoxWidget extends StatefulWidget {
  final String complaintTitle;
  final String complaintDescription;
  final String complaintStatus;
  final bool showBlueCircle;
  const NotificationBoxWidget(
      {super.key,
      required this.complaintTitle,
      required this.complaintDescription,
      required this.complaintStatus, required this.showBlueCircle});

  @override
  State<NotificationBoxWidget> createState() => _NotificationBoxWidgetState();
}

class _NotificationBoxWidgetState extends State<NotificationBoxWidget> {
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.only(
        top: 15,
        bottom: 15,
        left: 15,
        right: 15,
      ),
      width: double.infinity,
      //height: 100,
      decoration: BoxDecoration(
        color: Colors.white,
        border: Border(
          bottom: BorderSide(
            width: 1,
            color: Colors.black.withOpacity(0.4),
          ),
          top: BorderSide(
            width: 1,
            color: Colors.black.withOpacity(0.3),
          ),
        ),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          if (widget.showBlueCircle)
            Container(
              width: 10,
              height: 10,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(100),
                color: secondaryColor, // Blue circle
              ),
            ),
          SizedBox(width: widget.showBlueCircle ? 5 : 0),
          Image.asset(
            "assets/images/logo.png",
            width: 50,
          ),
          SizedBox(
            width: 10,
          ),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                //complaint title
                Text(
                  widget.complaintTitle,
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 16,
                  ),
                ),
                //complaint description
                Text(
                  "${widget.complaintDescription}",
                  style: TextStyle(
                    fontSize: 13,
                  ),
                ),
                Text(
                  "${widget.complaintStatus}",
                  style: TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.w900,
                      color: Colors.green),
                ),
              ],
            ),
          ),
          SizedBox(
            width: 15,
          ),
          Column(
            children: [
              // time of minutes
              Text("20 min"),
              SizedBox(
                height: 5,
              ),
              Icon(
                Icons.more_vert,
                size: 30,
              ),
            ],
          ),
        ],
      ),
    );
  }
}
