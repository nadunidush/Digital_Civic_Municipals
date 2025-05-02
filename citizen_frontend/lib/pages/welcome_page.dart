import 'package:complaint_management_system/pages/login_page.dart';
import 'package:complaint_management_system/pages/signup_page.dart';
import 'package:flutter/material.dart';
import '../constant/colors.dart' as colors;

class WelcomePage extends StatefulWidget {
  const WelcomePage({super.key});

  @override
  State<WelcomePage> createState() => _WelcomePageState();
}

class _WelcomePageState extends State<WelcomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        width: double.infinity,
        decoration: BoxDecoration(
          image: DecorationImage(
              image: AssetImage('assets/images/background.png'),
              fit: BoxFit.cover),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Image.asset("assets/images/logo.png"),
            SizedBox(
              height: 60,
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                //Login Button
                Container(
                  width: 150,
                  height: 50,
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: colors.mainColor,
                      foregroundColor: Colors.white,
                    ),
                    onPressed: () {
                      Navigator.push(context, MaterialPageRoute(builder: (context) => LoginPage()));
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
                  width: 20,
                ),

                //Registor Button
                Container(
                  height: 50,
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.white,
                      foregroundColor: colors.secondaryColor,
                      side: BorderSide(color: colors.secondaryColor, width: 2),
                    ),
                    onPressed: () {
                      Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => SignupPage()));
                    },
                    child: Text(
                      "Registor Now",
                      style: TextStyle(
                        fontSize: 18,
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
