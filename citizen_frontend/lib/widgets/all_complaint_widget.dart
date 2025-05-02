import 'package:complaint_management_system/constant/colors.dart';
import 'package:flutter/material.dart';

class AllComplaintWidget extends StatefulWidget {
  final String title;
  final String description;
  final String url;
  final String pLevel;
  final String departmentName;
  final String complaintStatus;
  final List<String> images;
  AllComplaintWidget(
      {super.key,
      required this.images,
      required this.title,
      required this.description,
      required this.url,
      required this.pLevel, required this.departmentName, required this.complaintStatus});

  @override
  State<AllComplaintWidget> createState() => _AllComplaintWidgetState();
}

class _AllComplaintWidgetState extends State<AllComplaintWidget> {
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

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        SizedBox(
          height: 20,
        ),
        Container(
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
                    "Priority Level: ",
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
                      widget.pLevel,
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
                    "Department: ",
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
                      widget.departmentName,
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
              //status
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    widget.complaintStatus,
                    style: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: Color(0xffB74BE5),
                        fontSize: 14),
                  ),
                  Icon(
                    Icons.delete,
                    color: Colors.red,
                    size: 30,
                    weight: 20,
                  ),
                ],
              ),
            ],
          ),
        ),
      ],
    );
  }
}
