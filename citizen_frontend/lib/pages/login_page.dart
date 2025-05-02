import 'dart:convert';

import 'package:complaint_management_system/pages/home_screen.dart';
import 'package:complaint_management_system/pages/signup_page.dart';
import 'package:complaint_management_system/widgets/text_form_field.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import '../constant/colors.dart';
import 'package:http/http.dart' as http;
import '../constant/env.dart' as env;

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final _formKey = GlobalKey<FormState>();

  final _email = TextEditingController();
  final _password = TextEditingController();

  Future<void> _login() async {
    final response = await http.post(
      Uri.parse('http://${env.IP_ADDRESS}:8080/login'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: jsonEncode(<String, String>{
        'email': _email.text,
        'password': _password.text,
      }),
    );
    if (response.statusCode == 200) {
      final user = jsonDecode(response.body);
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text("Login Successfully"),
        ),
      );
      Navigator.push(
          context,
          MaterialPageRoute(
              builder: (context) => HomeScreen(
                    email: user["email"],
                    userName:user["userName"],
                    userId: user["userId"],
                  )));
    } else {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(
        content: Text(
          "Login Failed",
          style: TextStyle(
            color: Colors.red,
          ),
        ),
      ));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        flexibleSpace: Image(
            image: AssetImage('assets/images/background.png'),
            fit: BoxFit.cover),
      ),
      body: SingleChildScrollView(
        child: Container(
          width: double.infinity,
          height: 750,
          decoration: const BoxDecoration(
            image: DecorationImage(
              image: AssetImage('assets/images/background.png'),
              fit: BoxFit.cover,
            ),
          ),
          child: Padding(
            padding: const EdgeInsets.only(left: 23.0, right: 23.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Form(
                  key: _formKey,
                  child: Column(
                    children: [
                      Text(
                        "CREATE AN ACCOUNT",
                        style: TextStyle(
                            fontWeight: FontWeight.w900, fontSize: 20),
                      ),
                      SizedBox(
                        height: 70,
                      ),

                      //Email
                      TextFormFieldWidget(
                        icon: Icons.email,
                        hintText: "Email",
                        textController: _email,
                        textInputType: TextInputType.emailAddress,
                        validator: (value) {
                          if (value == null || value.isEmpty) {
                            return 'Please enter an email';
                          }
                          // Regular expression for email validation
                          final RegExp emailRegex =
                              RegExp(r'^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[a-zA-Z]+');
                          if (!emailRegex.hasMatch(value)) {
                            return 'Please enter a valid email';
                          }
                          return null;
                        },
                      ),
                      SizedBox(height: 30),

                      //password
                      TextFormFieldWidget(
                        icon: Icons.lock,
                        hintText: "Password",
                        textController: _password,
                        obsecureText: true,
                        validator: (value) {
                          if (value == null || value.isEmpty) {
                            return "Please enter your password";
                          }
                        },
                      ),
                      SizedBox(height: 30),

                      //Register Button
                      SizedBox(
                        height: 45,
                      ),
                      Container(
                        width: 180,
                        height: 50,
                        child: ElevatedButton(
                          style: ElevatedButton.styleFrom(
                            backgroundColor: mainColor,
                            foregroundColor: Colors.white,
                          ),
                          onPressed: () {
                            if (_formKey.currentState!.validate()) {
                              _login();
                            }
                          },
                          child: Text(
                            "Login",
                            style: TextStyle(
                              fontSize: 18,
                            ),
                          ),
                        ),
                      ),

                      SizedBox(
                        height: 60,
                      ),
                      RichText(
                        text: TextSpan(
                          text: 'Don\'t have an account? ',
                          style: TextStyle(
                              color: Colors.black,
                              fontSize: 15,
                              fontWeight: FontWeight.w900),
                          children: <TextSpan>[
                            TextSpan(
                              text: 'Registor',
                              style: TextStyle(
                                color: secondaryColor,
                                fontSize: 15,
                              ),
                              recognizer: TapGestureRecognizer()
                                ..onTap = () {
                                  Navigator.push(
                                      context,
                                      MaterialPageRoute(
                                          builder: (context) => SignupPage()));
                                },
                            ),
                          ],
                        ),
                      )
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
