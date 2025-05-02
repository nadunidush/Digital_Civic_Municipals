import 'package:flutter/material.dart';
import '../constant/colors.dart';

class TextFormFieldWidget extends StatefulWidget {
  final IconData icon;
  final String hintText;
  final TextEditingController textController;
  final TextInputType textInputType;
  final bool obsecureText;
  final Function? validator;
  TextFormFieldWidget({
    super.key,
    required this.icon,
    required this.hintText,
    required this.textController,
    this.textInputType = TextInputType.text,
    this.obsecureText = false,
    this.validator,
  });

  @override
  State<TextFormFieldWidget> createState() => _TextFormFieldWidgetState();
}

class _TextFormFieldWidgetState extends State<TextFormFieldWidget> {
  @override
  Widget build(BuildContext context) {
    return TextFormField(
      obscureText: widget.obsecureText,
      controller: widget.textController,
      keyboardType: widget.textInputType,
      validator: (value) => widget.validator!(value),
      decoration: InputDecoration(
        prefixIcon: Icon(
          widget.icon,
          size: 35,
        ),
        prefixIconColor: secondaryColor,
        // fillColor: Colors.white,
        // filled: true,
        border: UnderlineInputBorder(
          borderSide: BorderSide(width: 1, color: Colors.black),
        ),
        hintText: widget.hintText.toString(),
      ),
      style: TextStyle(color: Colors.black),
    );
  }
}
