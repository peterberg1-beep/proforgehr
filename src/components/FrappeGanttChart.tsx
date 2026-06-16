import { useEffect, useRef, useCallback } from 'react';
import Gantt from 'frappe-gantt';

/**
 * Task data format for Frappe Gantt
 * Frappe Gantt expects dates in YYYY-MM-DD format
 */
interface FrappeTask {
  id: string;
  name: string;
  start: string; // YYYY-MM-DD
  end: string; // YYYY-MM-DD
  progress: number; // 0-100
  dependencies?: string[]; // Array of task IDs
  custom_class?: string;
}

interface TaskData {
  id: string;
  name: string;
  start: Date;
  end: Date;
  progress: number;
  type?: string;
  assignee?: string;
  dependencies?: string[];
  isMilestone?: boolean;
  project?: string;
  parentId?: string;
  notes?: string;
  documentLink?: string;
  documentLinks?: Array<{ name: string; url: string }>;
  status?: string;
  durationLocked?: boolean;
}

interface FrappeGanttChartProps {
  tasks: TaskData[];
  onTasksChange: (tasks: TaskData[]) => void;
  viewMode?: 'Day' | 'Week' | 'Month' | 'Year';
  onViewModeChange?: (mode: string) => void;
  holidays?: Array<{ date: string; label: string }>;
  ignoreWeekends?: boolean;
}

/**
 * Convert Date object to YYYY-MM-DD string
 */
const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Convert YYYY-MM-DD string to Date object
 */
const parseDate = (dateStr: string): Date => {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
};

/**
 * Convert TaskData (with Date objects) to FrappeTask (with string dates)
 */
const taskToFrappeTask = (task: TaskData): FrappeTask => {
  return {
    id: task.id,
    name: task.name,
    start: formatDate(task.start),
    end: formatDate(task.end),
    progress: task.progress || 0,
    dependencies: task.dependencies && task.dependencies.length > 0 ? task.dependencies : undefined,
    custom_class: getTaskClass(task),
  };
};

/**
 * Convert FrappeTask (with string dates) back to TaskData (with Date objects)
 */
const frappeTaskToTask = (frappeTask: FrappeTask, originalTask: TaskData): TaskData => {
  return {
    ...originalTask,
    id: frappeTask.id,
    name: frappeTask.name,
    start: parseDate(frappeTask.start),
    end: parseDate(frappeTask.end),
    progress: frappeTask.progress,
    dependencies: frappeTask.dependencies,
  };
};

/**
 * Get CSS class for task based on status
 */
const getTaskClass = (task: TaskData): string => {
  if (task.isMilestone) return 'milestone-task';
  if (task.status === 'delayed') return 'delayed-task';
  if (task.status === 'at-risk') return 'at-risk-task';
  if (task.status === 'on-track') return 'on-track-task';
  return '';
};

/**
 * FrappeGanttChart Component
 * 
 * Wrapper component for Frappe Gantt library with React integration
 * Handles data transformation between TaskData format and Frappe Gantt format
 * Manages task updates and view mode changes
 */
export const FrappeGanttChart = ({
  tasks,
  onTasksChange,
  viewMode = 'Month',
  onViewModeChange,
  holidays = [],
  ignoreWeekends = false,
}: FrappeGanttChartProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const ganttRef = useRef<any>(null);

  // Load Frappe Gantt CSS dynamically
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/frappe-gantt@1.2.2/dist/frappe-gantt.css';
    document.head.appendChild(link);
    return () => {
      if (link.parentNode) link.parentNode.removeChild(link);
    };
  }, []);

  // Initialize Gantt chart
  useEffect(() => {
    if (!containerRef.current || tasks.length === 0) return;

    try {
      // Convert tasks to Frappe format
      const frappeTasks = tasks.map(taskToFrappeTask);

      // Configure holidays
      const holidayConfig: Record<string, any> = {};
      if (holidays.length > 0) {
        holidayConfig['#ff6b6b'] = holidays.map((h) => ({
          date: h.date,
          label: h.label,
        }));
      }
      if (ignoreWeekends) {
        holidayConfig['#e0e0e0'] = 'weekend';
      }

      // Create Gantt instance
      ganttRef.current = new Gantt(containerRef.current, frappeTasks, {
        view_mode: viewMode,
        view_mode_select: true,
        date_format: 'YYYY-MM-DD',
        bar_height: 30,
        bar_corner_radius: 3,
        arrow_curve: 5,
        padding: 18,
        column_width: 45,
        scroll_to: 'today',
        auto_move_label: true,
        holidays: holidayConfig,
        on_click: (task: FrappeTask) => {
          // Handle task click - could trigger edit modal
          console.log('Task clicked:', task);
        },
        on_date_change: (task: FrappeTask) => {
          // Handle date change
          const updatedTasks = tasks.map((t) => {
            if (t.id === task.id) {
              return frappeTaskToTask(task, t);
            }
            return t;
          });
          onTasksChange(updatedTasks);
        },
        on_progress_change: (task: FrappeTask) => {
          // Handle progress change
          const updatedTasks = tasks.map((t) => {
            if (t.id === task.id) {
              return frappeTaskToTask(task, t);
            }
            return t;
          });
          onTasksChange(updatedTasks);
        },
      });

      return () => {
        // Cleanup
        if (ganttRef.current) {
          ganttRef.current = null;
        }
      };
    } catch (error) {
      console.error('Error initializing Frappe Gantt:', error);
    }
  }, [tasks, viewMode, holidays, ignoreWeekends, onTasksChange]);

  // Handle view mode changes
  const handleViewModeChange = useCallback(
    (newMode: string) => {
      if (ganttRef.current) {
        ganttRef.current.change_view_mode(newMode);
        onViewModeChange?.(newMode);
      }
    },
    [onViewModeChange]
  );

  // Expose methods for parent component
  useEffect(() => {
    if (containerRef.current && ganttRef.current) {
      (containerRef.current as any).ganttInstance = ganttRef.current;
      (containerRef.current as any).changeViewMode = handleViewModeChange;
    }
  }, [handleViewModeChange]);

  return (
    <div
      ref={containerRef}
      className="frappe-gantt-container w-full bg-white rounded-lg border border-border overflow-hidden"
      style={{
        minHeight: '600px',
        fontFamily: 'var(--font-sans)',
      }}
    />
  );
};

export default FrappeGanttChart;
