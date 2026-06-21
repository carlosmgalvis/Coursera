import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/time_entry.dart';
import '../providers/time_entry_provider.dart';
import '../providers/project_provider.dart';
import '../providers/task_provider.dart';

class AddTimeEntryScreen extends StatefulWidget {
  const AddTimeEntryScreen({super.key});

  @override
  State<AddTimeEntryScreen> createState() => _AddTimeEntryScreenState();
}

class _AddTimeEntryScreenState extends State<AddTimeEntryScreen> {
  final _formKey = GlobalKey<FormState>();
  String? _selectedProjectId;
  String? _selectedTaskId;
  final TextEditingController _totalTimeController = TextEditingController();
  final TextEditingController _noteController = TextEditingController();
  DateTime _selectedDate = DateTime.now();

  @override
  Widget build(BuildContext context) {
    final projectProvider = Provider.of<ProjectProvider>(context);
    final taskProvider = Provider.of<TaskProvider>(context);

    // İlk dəyərləri təyin et
    if (_selectedProjectId == null && projectProvider.projects.isNotEmpty) {
      _selectedProjectId = projectProvider.projects.first.id;
    }
    if (_selectedTaskId == null && taskProvider.tasks.isNotEmpty) {
      _selectedTaskId = taskProvider.tasks.first.id;
    }

    return Scaffold(
      appBar: AppBar(
        title: const Text('Add Time Entry'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              // Project Dropdown
              DropdownButtonFormField<String>(
                value: _selectedProjectId,
                decoration: const InputDecoration(labelText: 'Project'),
                items: projectProvider.projects.map((project) {
                  return DropdownMenuItem<String>(
                    value: project.id,
                    child: Text(project.name),
                  );
                }).toList(),
                onChanged: (String? newValue) {
                  setState(() {
                    _selectedProjectId = newValue;
                  });
                },
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please select a project';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 16),

              // Task Dropdown
              DropdownButtonFormField<String>(
                value: _selectedTaskId,
                decoration: const InputDecoration(labelText: 'Task'),
                items: taskProvider.tasks.map((task) {
                  return DropdownMenuItem<String>(
                    value: task.id,
                    child: Text(task.name),
                  );
                }).toList(),
                onChanged: (String? newValue) {
                  setState(() {
                    _selectedTaskId = newValue;
                  });
                },
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please select a task';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 16),

              // Date Selection
              ListTile(
                title: const Text('Date'),
                subtitle: Text(_formatDate(_selectedDate)),
                trailing: const Icon(Icons.calendar_today),
                onTap: () => _selectDate(context),
              ),
              const SizedBox(height: 16),

              // Total Time
              TextFormField(
                controller: _totalTimeController,
                decoration: const InputDecoration(labelText: 'Total Time (hours)'),
                keyboardType: TextInputType.number,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter total time';
                  }
                  if (double.tryParse(value) == null) {
                    return 'Please enter a valid number';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 16),

              // Note
              TextFormField(
                controller: _noteController,
                decoration: const InputDecoration(labelText: 'Note'),
                maxLines: 2,
              ),
              const SizedBox(height: 24),

              // Save Button
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: () {
                    if (_formKey.currentState!.validate()) {
                      _saveTimeEntry();
                    }
                  },
                  child: const Text('Save Entry'),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Future<void> _selectDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: _selectedDate,
      firstDate: DateTime(2000),
      lastDate: DateTime(2101),
    );
    if (picked != null && picked != _selectedDate) {
      setState(() {
        _selectedDate = picked;
      });
    }
  }

  void _saveTimeEntry() {
    final timeEntry = TimeEntry(
      id: DateTime.now().millisecondsSinceEpoch.toString(),
      projectId: _selectedProjectId!,
      taskId: _selectedTaskId!,
      totalTime: double.parse(_totalTimeController.text),
      date: _selectedDate,
      note: _noteController.text,
    );

    Provider.of<TimeEntryProvider>(context, listen: false).addTimeEntry(timeEntry);
    Navigator.pop(context);
  }

  String _formatDate(DateTime date) {
    return '${date.year}-${date.month.toString().padLeft(2, '0')}-${date.day.toString().padLeft(2, '0')}';
  }

  @override
  void dispose() {
    _totalTimeController.dispose();
    _noteController.dispose();
    super.dispose();
  }
}