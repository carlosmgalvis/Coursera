import 'package:flutter/material.dart';
import 'package:time_tracker/models/time_entry.dart';

class TimeEntryProvider with ChangeNotifier {
  final List<TimeEntry> _entries = [];

  List<TimeEntry> get entries => _entries;

  void addTimeEntry(TimeEntry entry) {
    _entries.add(entry);
    notifyListeners();
  }

  void deleteTimeEntry(String id) {
    _entries.removeWhere((entry) => entry.id == id);
    notifyListeners();
  }

  // Group entries by project
  Map<String, List<TimeEntry>> get entriesGroupedByProject {
    Map<String, List<TimeEntry>> grouped = {};
    for (var entry in _entries) {
      if (!grouped.containsKey(entry.projectId)) {
        grouped[entry.projectId] = [];
      }
      grouped[entry.projectId]!.add(entry);
    }
    return grouped;
  }
}
