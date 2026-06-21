import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/time_entry.dart';
import '../providers/time_entry_provider.dart';
import '../providers/project_provider.dart';
import '../providers/task_provider.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _selectedView = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Time Tracker',
          style: TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.bold,
            color: Colors.white,
          ),
        ),
        centerTitle: true,
        backgroundColor: const Color(0xFF039588),
        leading: Builder(
          builder: (context) => IconButton(
            icon: const Icon(
              Icons.menu,
              color: Colors.white,
            ),
            onPressed: () => Scaffold.of(context).openDrawer(),
          ),
        ),
        elevation: 0,
      ),
      drawer: _buildDrawer(context),
      body: Column(
        children: [
          _buildViewToggle(),
          Expanded(
            child: Consumer<TimeEntryProvider>(
              builder: (context, timeProvider, child) {
                final entries = timeProvider.entries;
                if (entries.isEmpty) {
                  return _buildEmptyState();
                }
                return _selectedView == 0 
                    ? _buildAllEntriesView(entries, timeProvider)
                    : _buildGroupedByProjectsView(entries, timeProvider);
              },
            ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.pushNamed(context, '/add-entry');
        },
        backgroundColor: const Color(0xFF039588),
        child: const Icon(Icons.add, color: Colors.white),
      ),
    );
  }

  Widget _buildViewToggle() {
    return Container(
      padding: const EdgeInsets.all(16.0),
      decoration: BoxDecoration(
        color: Colors.white,
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.3),
            blurRadius: 2,
            offset: const Offset(0, 1),
          ),
        ],
      ),
      child: Row(
        children: [
          Expanded(
            child: ChoiceChip(
              label: const Text(
                'All Entries',
                style: TextStyle(fontSize: 14),
              ),
              selected: _selectedView == 0,
              selectedColor: const Color(0xFF039588),
              onSelected: (selected) {
                setState(() {
                  _selectedView = 0;
                });
              },
              labelStyle: TextStyle(
                color: _selectedView == 0 ? Colors.white : Colors.black,
              ),
            ),
          ),
          const SizedBox(width: 8),
          Expanded(
            child: ChoiceChip(
              label: const Text(
                'Grouped by Projects',
                style: TextStyle(fontSize: 14),
              ),
              selected: _selectedView == 1,
              selectedColor: const Color(0xFF039588),
              onSelected: (selected) {
                setState(() {
                  _selectedView = 1;
                });
              },
              labelStyle: TextStyle(
                color: _selectedView == 1 ? Colors.white : Colors.black,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildAllEntriesView(List<TimeEntry> entries, TimeEntryProvider timeProvider) {
    final projectProvider = Provider.of<ProjectProvider>(context, listen: false);
    final taskProvider = Provider.of<TaskProvider>(context, listen: false);

    return ListView.builder(
      itemCount: entries.length,
      itemBuilder: (context, index) {
        final entry = entries[index];
        final project = projectProvider.getProjectById(entry.projectId);
        final task = taskProvider.getTaskById(entry.taskId);

        return Dismissible(
          key: Key(entry.id),
          direction: DismissDirection.endToStart,
          background: Container(
            color: Colors.red,
            alignment: Alignment.centerRight,
            padding: const EdgeInsets.only(right: 20),
            child: const Icon(Icons.delete, color: Colors.white, size: 30),
          ),
          confirmDismiss: (direction) async {
            return await _showDeleteConfirmationDialog(context, 'time entry');
          },
          onDismissed: (direction) {
            timeProvider.deleteTimeEntry(entry.id);
            _showSnackBar(context, 'Time entry deleted');
          },
          child: Card(
            margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
            child: ListTile(
              title: Text('${project?.name ?? 'Unknown'} - ${task?.name ?? 'Unknown'}'),
              subtitle: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('${entry.totalTime} hours'),
                  Text('Date: ${_formatDate(entry.date)}'),
                  if (entry.note.isNotEmpty) Text('Note: ${entry.note}'),
                ],
              ),
              trailing: IconButton(
                icon: const Icon(Icons.delete, color: Colors.red),
                onPressed: () {
                  _showDeleteDialog(context, entry, timeProvider);
                },
              ),
            ),
          ),
        );
      },
    );
  }

  Widget _buildGroupedByProjectsView(List<TimeEntry> entries, TimeEntryProvider timeProvider) {
    final projectProvider = Provider.of<ProjectProvider>(context, listen: false);
    final taskProvider = Provider.of<TaskProvider>(context, listen: false);
    
    final Map<String, List<TimeEntry>> groupedEntries = {};
    for (final entry in entries) {
      if (!groupedEntries.containsKey(entry.projectId)) {
        groupedEntries[entry.projectId] = [];
      }
      groupedEntries[entry.projectId]!.add(entry);
    }

    return ListView.builder(
      itemCount: groupedEntries.length,
      itemBuilder: (context, index) {
        final projectId = groupedEntries.keys.elementAt(index);
        final projectEntries = groupedEntries[projectId]!;
        final project = projectProvider.getProjectById(projectId);

        return Card(
          margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
          child: Padding(
            padding: const EdgeInsets.all(12.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  project?.name ?? 'Unknown Project',
                  style: const TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 8),
                ...projectEntries.map((entry) {
                  final task = taskProvider.getTaskById(entry.taskId);
                  return Dismissible(
                    key: Key(entry.id),
                    direction: DismissDirection.endToStart,
                    background: Container(
                      color: Colors.red,
                      alignment: Alignment.centerRight,
                      padding: const EdgeInsets.only(right: 10),
                      child: const Icon(Icons.delete, color: Colors.white, size: 24),
                    ),
                    confirmDismiss: (direction) async {
                      return await _showDeleteConfirmationDialog(context, 'time entry');
                    },
                    onDismissed: (direction) {
                      timeProvider.deleteTimeEntry(entry.id);
                      _showSnackBar(context, 'Time entry deleted');
                    },
                    child: ListTile(
                      contentPadding: EdgeInsets.zero,
                      title: Text(
                        '• ${task?.name ?? 'Unknown Task'}: ${entry.totalTime} hours (${_formatDate(entry.date)})',
                      ),
                      trailing: IconButton(
                        icon: const Icon(Icons.delete, color: Colors.red, size: 20),
                        onPressed: () {
                          _showDeleteDialog(context, entry, timeProvider);
                        },
                      ),
                    ),
                  );
                }),
              ],
            ),
          ),
        );
      },
    );
  }

  Widget _buildEmptyState() {
    return const Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(
            Icons.hourglass_empty,
            size: 64,
            color: Colors.grey,
          ),
          SizedBox(height: 16),
          Text(
            'No time entries yet!',
            style: TextStyle(fontSize: 18, color: Colors.grey),
          ),
          SizedBox(height: 8),
          Text(
            'Tap the + button to add your first entry.',
            style: TextStyle(color: Colors.grey),
          ),
        ],
      ),
    );
  }

  void _showDeleteDialog(BuildContext context, TimeEntry entry, TimeEntryProvider timeProvider) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Delete Time Entry'),
        content: const Text('Are you sure you want to delete this time entry?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('Cancel'),
          ),
          TextButton(
            onPressed: () {
              timeProvider.deleteTimeEntry(entry.id);
              Navigator.of(context).pop();
              _showSnackBar(context, 'Time entry deleted');
            },
            style: TextButton.styleFrom(foregroundColor: Colors.red),
            child: const Text('Delete'),
          ),
        ],
      ),
    );
  }

  Future<bool?> _showDeleteConfirmationDialog(BuildContext context, String itemType) async {
    return await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Delete'),
        content: Text('Are you sure you want to delete this $itemType?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(false),
            child: const Text('Cancel'),
          ),
          TextButton(
            onPressed: () => Navigator.of(context).pop(true),
            style: TextButton.styleFrom(foregroundColor: Colors.red),
            child: const Text('Delete'),
          ),
        ],
      ),
    );
  }

  void _showSnackBar(BuildContext context, String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
        backgroundColor: Colors.red,
        duration: const Duration(seconds: 2),
      ),
    );
  }

  String _formatDate(DateTime date) {
    return '${date.year}-${date.month.toString().padLeft(2, '0')}-${date.day.toString().padLeft(2, '0')}';
  }

  Widget _buildDrawer(BuildContext context) {
    return Drawer(
      child: ListView(
        padding: EdgeInsets.zero,
        children: [
          DrawerHeader(
            decoration: const BoxDecoration(
              color: Color(0xFF039588),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                const Text(
                  'Time Tracker',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  'Track your time efficiently',
                  style: TextStyle(
                    color: Colors.white.withOpacity(0.8),
                    fontSize: 14,
                  ),
                ),
              ],
            ),
          ),
          ListTile(
            leading: const Icon(Icons.home, color: Color(0xFF039588)),
            title: const Text('Home'),
            onTap: () {
              Navigator.pop(context);
            },
          ),
          ListTile(
            leading: const Icon(Icons.work, color: Color(0xFF039588)),
            title: const Text('Projects'),
            onTap: () {
              Navigator.pushNamed(context, '/projects');
            },
          ),
          ListTile(
            leading: const Icon(Icons.list, color: Color(0xFF039588)),
            title: const Text('Tasks'),
            onTap: () {
              Navigator.pushNamed(context, '/tasks');
            },
          ),
        ],
      ),
    );
  }
}