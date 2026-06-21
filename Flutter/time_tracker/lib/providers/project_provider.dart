import 'package:flutter/material.dart';
import '../models/project.dart';

class ProjectProvider with ChangeNotifier {
  final List<Project> _projects = [
    Project(id: '1', name: 'Project Alpha'),
    Project(id: '2', name: 'Project Beta'),
    Project(id: '3', name: 'Project Gamma'),
  ];

  List<Project> get projects => _projects;

  void addProject(Project project) {
    _projects.add(project);
    notifyListeners();
  }

  void deleteProject(String id) {
    _projects.removeWhere((project) => project.id == id);
    notifyListeners();
  }

  Project? getProjectById(String id) {
    try {
      return _projects.firstWhere((project) => project.id == id);
    } catch (e) {
      return null;
    }
  }
}