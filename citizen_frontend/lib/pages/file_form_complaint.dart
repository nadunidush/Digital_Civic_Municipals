import 'dart:convert';
import 'package:complaint_management_system/constant/colors.dart';
import 'package:complaint_management_system/widgets/file_form_widget.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:image_picker/image_picker.dart';
import '../constant/env.dart' as env;

class FileFormComplaint extends StatefulWidget {
  String email;
  String userId;
  FileFormComplaint({super.key, required this.email, required this.userId});

  @override
  State<FileFormComplaint> createState() => _FileFormComplaintState();
}

class _FileFormComplaintState extends State<FileFormComplaint> {
  final TextEditingController _titleController = TextEditingController();
  final TextEditingController _descriptionController = TextEditingController();
  final TextEditingController _urlController = TextEditingController();
  final TextEditingController _pLevelController = TextEditingController();

  final _formKey = GlobalKey<FormState>();

  final ImagePicker _picker = ImagePicker();
  List<XFile>? _selectedImages = [];
  List<String> _uploadedImageUrls = [];
  bool _isUploading = false;

  /* My Code*/

  // Future<void> getImages() async {
  //   final List<XFile>? images = await _picker.pickMultiImage();

  //   if (images != null && images.isNotEmpty) {
  //     setState(() => _image = images);
  //   } else {
  //     print("No images selected");
  //   }
  // }

  // Future<String?> uploadImage(XFile image) async {
  //   final url = "https://api.cloudinary.com/v1_1/di8cecggr/image/upload";
  //   final request = http.MultipartRequest("POST", Uri.parse(url));

  //   request.fields['upload_preset'] = "upload_images"; // Set in Cloudinary
  //   request.files.add(await http.MultipartFile.fromPath('file', image.path));

  //   try {
  //     final response = await request.send();
  //     final responseData = await response.stream.bytesToString();
  //     final jsonResponse = json.decode(responseData);

  //     if (response.statusCode == 200) {
  //       return jsonResponse['secure_url']; // Cloudinary URL
  //     } else {
  //       print("Failed to upload image: ${jsonResponse['error']['message']}");
  //       return null;
  //     }
  //   } catch (e) {
  //     print("Error uploading image: $e");
  //     return null;
  //   }
  // }

  /*Perplexity Code */
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
      await saveToMongoDB(files);
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

  Future<void> saveToMongoDB(List<Map<String, String>> files) async {
    const mongoDbApiUrl =
        "http://${env.IP_ADDRESS}:8080/complaint"; // Replace with your backend API URL

    final complaintData = {
      'userId': widget.userId,
      'title': _titleController.text,
      'description': _descriptionController.text,
      'url': _urlController.text,
      'pLevel': _pLevelController.text,
      'files': files, // Array of uploaded image objects
    };

    try {
      final response = await http.post(
        Uri.parse(mongoDbApiUrl),
        headers: {'Content-Type': 'application/json'},
        body: json.encode(complaintData),
      );

      if (response.statusCode == 200) {
        print("Successfully saved complaint to MongoDB");
      } else {
        print("Failed to save complaint: ${response.body}");
      }
    } catch (e) {
      print("Error saving complaint to MongoDB: $e");
    }
  }

  /*My Codes */
  // Future<void> _uploadComplaint() async {
  //   List<String> imageUrls = [];

  //   if (_image != null && _image!.isNotEmpty) {
  //     for (var file in _image!) {
  //       String? imageUrl = await uploadImage(file);
  //       if (imageUrl != null) {
  //         imageUrls.add(imageUrl);
  //       } else {
  //         print('Error uploading image: ${file.name}');
  //       }
  //     }
  //   }

  //   var request = http.MultipartRequest(
  //       'POST', Uri.parse("http://${env.IP_ADDRESS}:8080/complaint"));

  //   request.fields['title'] = _titleController.text;
  //   request.fields['description'] = _descriptionController.text;
  //   request.fields['url'] = _urlController.text;
  //   request.fields['pLevel'] = _pLevelController.text;

  //   // Add images URLs to request
  //   request.fields['files'] = jsonEncode(imageUrls);
  //   print(jsonEncode(imageUrls));

  //   try {
  //     var response = await request.send();
  //     final respStr = await response.stream.bytesToString();
  //     print(respStr);

  //     if (response.statusCode == 200) {
  //       ScaffoldMessenger.of(context).showSnackBar(
  //         SnackBar(
  //           content: Text("Complaint Created Successfully"),
  //         ),
  //       );
  //       Navigator.push(context,
  //           MaterialPageRoute(builder: (context) => AllComplaintsPage()));
  //     } else {
  //       ScaffoldMessenger.of(context).showSnackBar(SnackBar(
  //         content: Text(
  //           "Failed to create complaint",
  //         ),
  //       ));
  //     }
  //   } catch (e) {
  //     ScaffoldMessenger.of(context).showSnackBar(SnackBar(
  //       content: Text(
  //         "Failed to create complaint: ${e.toString()}",
  //       ),
  //     ));
  //   }
  // }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        flexibleSpace: Image(
            image: AssetImage("assets/images/background.png"),
            fit: BoxFit.cover),
        title: Text(
          "Fill Form Complaint",
          style: TextStyle(
            fontWeight: FontWeight.w900,
          ),
        ),
      ),
      body: Stack(
        children: [
          Container(
            width: double.infinity,
            height: 750,
            decoration: BoxDecoration(
              image: DecorationImage(
                image: AssetImage("assets/images/background.png"),
                fit: BoxFit.cover,
              ),
            ),
          ),
          SingleChildScrollView(
            child: Padding(
              padding: const EdgeInsets.only(
                top: 20.0,
                left: 30.0,
                right: 30.0,
              ),
              child: Form(
                key: _formKey,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      "Complaint Details",
                      style: TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.w900,
                          color: mainColor),
                    ),

                    //Complaint Title
                    FileFormWidget(
                      title: "Complaint Title",
                      icon: Icons.title,
                      hintText: "Enter Title",
                      controller: _titleController,
                      validator: (value) {
                        if (value!.isEmpty) {
                          return "Please enter complaint title";
                        }
                        return null;
                      },
                    ),

                    //Complaint Description
                    FileFormWidget(
                      title: "Complaint Description",
                      icon: Icons.description,
                      hintText: "Enter your complaint description",
                      controller: _descriptionController,
                      keyBoardType: TextInputType.multiline,
                      validator: (value) {
                        if (value!.isEmpty) {
                          return "Please enter complaint description";
                        }
                        return null;
                      },
                    ),

                    SizedBox(height: 20.0),

                    //Complaint Image
                    Text(
                      "Complaint Images",
                      style:
                          TextStyle(fontWeight: FontWeight.bold, fontSize: 17),
                    ),
                    SizedBox(
                      height: 7,
                    ),
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
                            width: 10,
                          ),
                          FloatingActionButton(
                            onPressed: () => selectImages(),
                            child: Icon(
                              Icons.add,
                              size: 30,
                              color: secondaryColor,
                            ),
                            tooltip: "Add Image",
                            // shape: BeveledRectangleBorder(
                            //     borderRadius: BorderRadius.circular(5),
                            //     side:
                            //         BorderSide(color: Colors.black, width: 1)),
                          )
                        ],
                      ),
                    ),

                    //Complaint URL link
                    FileFormWidget(
                      title: "Complaint Location URL",
                      icon: Icons.link,
                      hintText: "Enter URL",
                      controller: _urlController,
                      keyBoardType: TextInputType.url,
                      validator: (value) {
                        if (value!.isEmpty) {
                          return "Please enter URL link";
                        }
                        return null;
                      },
                    ),

                    FileFormWidget(
                      title: "Complaint Priority Level",
                      icon: Icons.priority_high_rounded,
                      hintText: "(High, Medium, Low)",
                      controller: _pLevelController,
                      keyBoardType: TextInputType.text,
                      validator: (value) {
                        if (value!.isEmpty) {
                          return "Please enter priority level";
                        }
                        return null;
                      },
                    ),

                    SizedBox(
                      height: 30,
                    ),

                    // ListView.builder(
                    //     itemCount: _image == null ? 0 : _image!.length,
                    //     shrinkWrap: true,
                    //     itemBuilder: (context, index) {
                    //       return _image == null
                    //           ? const Text("No image selected")
                    //           : Image.file(File(_image![index].path));
                    //     }),
                    //User's Details

                    if (_isUploading)
                      Center(
                        child: Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: CircularProgressIndicator(),
                        ),
                      ),
                    //Submit Button
                    Center(
                      child: Container(
                        width: 180,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(8),
                          gradient: LinearGradient(
                              colors: [Color(0xffBB1900), Color(0xffFFB000)],
                              begin: Alignment.centerLeft,
                              end: Alignment.centerRight),
                        ),
                        child: ElevatedButton(
                          style: ElevatedButton.styleFrom(
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(20),
                            ),
                            backgroundColor: Colors.transparent,
                            shadowColor: Colors.transparent,
                            foregroundColor: Colors.white,
                          ),
                          onPressed: () {
                            if (_formKey.currentState!.validate()) {
                              uploadImagesAndSaveToMongoDB();
                            }
                          },
                          child: Text("Submit",
                              style: TextStyle(
                                  fontWeight: FontWeight.bold, fontSize: 16)),
                        ),
                      ),
                    ),
                    SizedBox(
                      height: 30,
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
