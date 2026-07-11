import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'authScreens/loginScreen.dart';

void main(){
  debugPaintSizeEnabled = true;
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

 static const appTitle = 'Social and Recommendation System';
 
  @override
  Widget build(BuildContext context){
    return const MaterialApp(
      title: appTitle,
      debugShowCheckedModeBanner: false,
      home: LoginScreen(),
    );
  }
}