import 'package:complaint_management_system/constant/colors.dart';
import 'package:flutter/material.dart';

class FileFormWidget extends StatefulWidget {
  final String? title;
  final IconData icon;
  final String? hintText;
  final TextEditingController? controller;
  final TextInputType? keyBoardType;
  final Function? validator;
  final Future<void> Function()? onTap;
  FileFormWidget({
    super.key,
    required this.title,
    required this.icon,
    required this.hintText,
    required this.controller,
    this.keyBoardType = TextInputType.text,
    required this.validator,
    this.onTap,
  });

  @override
  State<FileFormWidget> createState() => _FileFormWidgetState();
}

class _FileFormWidgetState extends State<FileFormWidget> {
  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SizedBox(
          height: 25,
        ),
        Text(
          "${widget.title}",
          style: TextStyle(fontWeight: FontWeight.bold, fontSize: 17),
        ),
        SizedBox(
          height: 7,
        ),
        TextFormField(
          controller: widget.controller,
          validator: (value) => widget.validator!(value),
          onTap: widget.onTap,
          decoration: InputDecoration(
            fillColor: Colors.white,
            filled: true,
            prefixIcon: Icon(
              widget.icon,
              color: secondaryColor,
              size: 30,
            ),
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(10),
            ),
            hintText: "${widget.hintText}",
            hintStyle: TextStyle(
              color: Colors.black.withOpacity(0.4),
            ),
          ),
          maxLines: null,
          keyboardType: widget.keyBoardType,
        ),
      ],
    );
  }
}
