import 'package:complaint_management_system/constant/colors.dart';
import 'package:flutter/material.dart';

class HomeCatogoryWidget extends StatefulWidget {
  final String image;
  final String title;
  HomeCatogoryWidget({
    super.key,
    required this.image,
    required this.title,
  });

  @override
  State<HomeCatogoryWidget> createState() => _HomeCatogoryWidgetState();
}

class _HomeCatogoryWidgetState extends State<HomeCatogoryWidget> {
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(8),
      width: 170,
      height: 130,
      decoration: BoxDecoration(
        color: Color(0xffFFFCD2),
        borderRadius: BorderRadius.circular(8.0),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Image.asset(
            "${widget.image}",
            width: 60,
            color: secondaryColor,
          ),
          SizedBox(
            height: 5,
          ),
          Text(
            textAlign: TextAlign.center,
            "${widget.title}",
            style: TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 14,
            ),
          ),
        ],
      ),
    );
  }
}
