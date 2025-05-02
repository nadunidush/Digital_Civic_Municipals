import Flutter
import UIKit
import GoogleMaps
@main
@objc class AppDelegate: FlutterAppDelegate {
  override func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
  ) -> Bool {
    GeneratedPluginRegistrant.register(with: self)
    GMSServices.provideAPIKey("AIzaSyDPtkrfWdJR2dAg5goA08UToIbSZ02Fx4I")  
    return super.application(application, didFinishLaunchingWithOptions: launchOptions)
  }
}
