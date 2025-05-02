import 'dart:convert';

import 'package:complaint_management_system/pages/login_page.dart';
import 'package:complaint_management_system/widgets/text_form_field.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import '../constant/colors.dart';
import 'package:http/http.dart' as http;
import '../constant/env.dart' as env;
import 'package:image_picker/image_picker.dart';

class SignupPage extends StatefulWidget {
  const SignupPage({super.key});

  @override
  State<SignupPage> createState() => _SignupPageState();
}

class _SignupPageState extends State<SignupPage> {
  final _formKey = GlobalKey<FormState>();
  final TextEditingController _userName = TextEditingController();
  final TextEditingController _email = TextEditingController();
  final TextEditingController _phoneNumber = TextEditingController();
  final TextEditingController _address = TextEditingController();
  final TextEditingController _password = TextEditingController();
  final TextEditingController _confirmPassword = TextEditingController();

  //image uploading
  final ImagePicker _picker = ImagePicker();
  List<XFile>? _selectedImages = [];
  List<String> _uploadedImageUrls = [];
  bool _isUploading = false;

  Future<void> selectImages() async {
    final List<XFile>? images = await _picker.pickMultiImage();
    if (images != null && images.isNotEmpty) {
      setState(() {
        _selectedImages = images;
      });
    } else {
      print("No images selected");
    }
  }

  Future<void> uploadImagesAndSaveToMongoDB() async {
    if (_selectedImages == null || _selectedImages!.isEmpty) {
      print("No images selected for upload");
      return;
    }

    setState(() => _isUploading = true);

    final List<Map<String, String>> files = [];
    try {
      for (XFile image in _selectedImages!) {
        final cloudinaryResponse = await uploadImageToCloudinary(image);
        if (cloudinaryResponse != null) {
          files.add({
            'url': cloudinaryResponse['secure_url'], // Cloudinary URL
            'id': cloudinaryResponse['public_id'], // Cloudinary ID
          });
          setState(
              () => _uploadedImageUrls.add(cloudinaryResponse['secure_url']));
        }
      }

      // Save the uploaded images data to MongoDB
      await _signup(files);
    } catch (e) {
      print('Error: $e');
    } finally {
      setState(() => _isUploading = false);
    }
  }

  Future<Map<String, dynamic>?> uploadImageToCloudinary(XFile image) async {
    const cloudinaryUrl =
        "https://api.cloudinary.com/v1_1/di8cecggr/image/upload";
    const uploadPreset = "upload_images"; // Set this in Cloudinary dashboard

    final request = http.MultipartRequest("POST", Uri.parse(cloudinaryUrl));
    request.fields['upload_preset'] = uploadPreset;
    request.files.add(await http.MultipartFile.fromPath('file', image.path));

    try {
      final response = await request.send();
      final responseData = await response.stream.bytesToString();
      if (response.statusCode == 200) {
        return json.decode(responseData); // Returns Cloudinary response
      } else {
        print(
            "Failed to upload image: ${json.decode(responseData)['error']['message']}");
        return null;
      }
    } catch (e) {
      print("Error uploading image: $e");
      return null;
    }
  }

 Future<void> _signup(List<Map<String, String>> files) async {
  try {
    if (_formKey.currentState!.validate()) {
      // Prepare the body with proper encoding of the file list
      final body = jsonEncode({
        "userName": _userName.text,
        "email": _email.text,
        "phoneNumber": _phoneNumber.text,
        "address": _address.text,
        "image": files.map((file) => file).toList(), // Convert files to JSON
        "password": _password.text,
        "confirmPassword": _confirmPassword.text,
      });

      // Perform the POST request
      final response = await http.post(
        Uri.parse("http://${env.IP_ADDRESS}:8080/signup"), // Use the environment-based IP address
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: body,
      );

      // Handle the response
      if (response.statusCode == 200) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text("User Registered Successfully")),
        );

        // Navigate to LoginPage
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (context) => LoginPage()),
        );
      } else {
        // Extract the error message from the response if available
        final errorMsg = jsonDecode(response.body)['message'] ?? 'Failed to register user';
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(errorMsg)),
        );
      }
    }
  } catch (e) {
    print("Signup error: $e");

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text("An error occurred. Please try again.")),
    );
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
          //height: 750,
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

                      //Form
                      TextFormFieldWidget(
                        icon: Icons.person,
                        hintText: "User Name",
                        textController: _userName,
                        textInputType: TextInputType.text,
                        validator: (value) {
                          if (value!.isEmpty) {
                            return "Please enter user name";
                          }
                          return null;
                        },
                      ),
                      SizedBox(height: 30),

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

                      //Phone Number
                      TextFormFieldWidget(
                        icon: Icons.person,
                        hintText: "Phone Number",
                        textController: _phoneNumber,
                        textInputType: TextInputType.phone,
                        validator: (value) {
                          if (value!.isEmpty) {
                            return "Please enter user phone number";
                          }
                          return null;
                        },
                      ),
                      SizedBox(height: 30),

                      //Address
                      TextFormFieldWidget(
                        icon: Icons.person,
                        hintText: "Address",
                        textController: _address,
                        textInputType: TextInputType.streetAddress,
                        validator: (value) {
                          if (value!.isEmpty) {
                            return "Please enter your address";
                          }
                          return null;
                        },
                      ),
                      SizedBox(height: 30),

                      //Complaint Image
                      Container(
                        padding: EdgeInsets.only(
                            left: 10, right: 10, top: 10, bottom: 10),
                        width: double.infinity,
                        height: 55,
                        decoration: BoxDecoration(
                          color: Colors.white,
                          border: Border.all(color: Colors.black, width: 1),
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: Row(
                          children: [
                            Icon(
                              Icons.file_copy_outlined,
                              size: 30,
                              color: secondaryColor,
                            ),
                            SizedBox(
                              width: 20,
                            ),
                            FloatingActionButton(
                              onPressed: () => selectImages(),
                              child: Icon(
                                Icons.add,
                                size: 20,
                                color: secondaryColor,
                              ),
                              tooltip: "Add Image",
                              // shape: BeveledRectangleBorder(
                              //     borderRadius: BorderRadius.circular(5),
                              //     side:
                              //         BorderSide(color: Colors.black, width: 1)),
                            ),
                            SizedBox(
                              width: 8,
                            ),
                            Text(
                              "Add Image",
                              style:
                                  TextStyle(fontSize: 15, color: Colors.grey),
                            ),
                          ],
                        ),
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
                            return 'Please enter a password';
                          }
                          if (value.length < 8) {
                            return 'Password must be at least 8 characters long';
                          }
                          if (!RegExp(r'[A-Z]').hasMatch(value)) {
                            return 'Password must contain at least one uppercase letter';
                          }
                          if (!RegExp(r'[a-z]').hasMatch(value)) {
                            return 'Password must contain at least one lowercase letter';
                          }
                          if (!RegExp(r'[0-9]').hasMatch(value)) {
                            return 'Password must contain at least one digit';
                          }
                          if (!RegExp(r'[!@#$%^&*(),.?":{}|<>]')
                              .hasMatch(value)) {
                            return 'Password must contain at least one special character';
                          }
                          return null;
                        },
                      ),
                      SizedBox(height: 30),

                      //confirm password
                      TextFormFieldWidget(
                        icon: Icons.password_outlined,
                        hintText: "Confirm Password",
                        textController: _confirmPassword,
                        obsecureText: true,
                        validator: (value) {
                          if (value == null || value.isEmpty) {
                            return 'Please enter a password';
                          }
                          if (value != _password.text) {
                            return 'Passwords do not match';
                          }
                          return null;
                        },
                      ),

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
                            uploadImagesAndSaveToMongoDB();
                          },
                          child: Text(
                            "Registor Here",
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
                          text: 'Already have an account? ',
                          style: TextStyle(
                              color: Colors.black,
                              fontSize: 15,
                              fontWeight: FontWeight.w900),
                          children: <TextSpan>[
                            TextSpan(
                              text: 'Login',
                              style: TextStyle(
                                color: secondaryColor,
                                fontSize: 15,
                              ),
                              recognizer: TapGestureRecognizer()
                                ..onTap = () {
                                  Navigator.push(
                                      context,
                                      MaterialPageRoute(
                                          builder: (context) => LoginPage()));
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
