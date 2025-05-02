import 'package:complaint_management_system/constant/colors.dart';
import 'package:flutter/material.dart';

class ProfileBoxTile extends StatefulWidget {
  final IconData icon;
  final String title;
  const ProfileBoxTile({super.key, required this.icon, required this.title});

  @override
  State<ProfileBoxTile> createState() => _ProfileBoxTileState();
}

class _ProfileBoxTileState extends State<ProfileBoxTile> {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        SizedBox(
          height: 20,
        ),

        //profile box tile
        Container(
          padding: EdgeInsets.all(10),
          width: double.infinity,
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(20),
            boxShadow: [
              BoxShadow(
                color: secondaryColor.withOpacity(0.4),
                spreadRadius: 3,
                blurRadius: 0.5,
              ),
            ],
          ),
          child: Row(
            children: [
              Icon(
                widget.icon,
                color: mainColor,
                size: 35,
              ),
              SizedBox(
                width: 50,
              ),
              Expanded(
                child: Text(
                  maxLines: 5,
                  "${widget.title}",
                  style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
