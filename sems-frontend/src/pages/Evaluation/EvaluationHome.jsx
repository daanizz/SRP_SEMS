import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Calendar, Target, Check, Award, Eye, Gamepad2, X, TrendingUp, BarChart3, Filter, User } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const navItems = [
  { name: "Dashboard", icon: Activity },
  { name: "Student", icon: Calendar },
  { name: "Behavior", icon: Eye },
  { name: "Therapy", icon: Target },
  { name: "Evaluation", icon: Check },
  { name: "Goal", icon: Award },
  { name: "Games", icon: Gamepad2 },
];

// Mock Data
const mockClasses = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'];

const mockStudents = {
  'Class 1': ['Amith A', 'Hari', 'Ashin'],
  'Class 2': ['Olivia Brown', 'Noah Davis', 'Ava Wilson'],
  'Class 3': ['Sophia Martinez', 'James Anderson', 'Isabella Taylor'],
  'Class 4': ['Mia Thomas', 'Benjamin Moore', 'Charlotte Jackson'],
  'Class 5': ['Amelia White', 'Lucas Harris', 'Harper Clark']
};

const mockSubjects = [
  { id: 1, name: 'Mathematics', color: '#3B82F6' },
  { id: 2, name: 'Science', color: '#10B981' },
  { id: 3, name: 'English', color: '#F59E0B' },
  { id: 4, name: 'Social Studies', color: '#8B5CF6' },
  { id: 5, name: 'Art', color: '#EC4899' }
];

const mockTerms = ['Term 1', 'Term 2', 'Term 3', 'Term 4'];

const mockEvaluations = [
  {
    id: 1,
    student: 'Amith A',
    class: 'Class 1',
    subject: 'Mathematics',
    term: 'Term 1',
    score: 85,
    remarks: 'Excellent progress in algebra',
    evaluatedBy: 'Ms. Anderson',
    date: '2024-01-15'
  },
  {
    id: 2,
    student: 'Hari',
    class: 'Class 1',
    subject: 'Science',
    term: 'Term 1',
    score: 78,
    remarks: 'Good understanding of concepts',
    evaluatedBy: 'Mr. Thompson',
    date: '2024-01-16'
  },
  {
    id: 3,
    student: 'Ashin',
    class: 'Class 1',
    subject: 'English',
    term: 'Term 1',
    score: 92,
    remarks: 'Outstanding writing skills',
    evaluatedBy: 'Ms. Rodriguez',
    date: '2024-01-17'
  }
];

// Generate performance data for charts
const generatePerformanceData = (studentName) => {
  const data = mockTerms.map(term => {
    const termData = { term };
    mockSubjects.forEach(subject => {
      // Generate realistic scores with some variation
      const baseScore = 60 + Math.random() * 30;
      const variation = (Math.random() - 0.5) * 20;
      termData[subject.name] = Math.min(100, Math.max(40, Math.round(baseScore + variation)));
    });
    return termData;
  });
  return data;
};

const EvaluationPortal = () => {
  const [activeNav, setActiveNav] = useState('Evaluation');
  const [showStatistics, setShowStatistics] = useState(false);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [showChart, setShowChart] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [showEvalForm, setShowEvalForm] = useState(false);
  
  const [formData, setFormData] = useState({
    student: '',
    class: '',
    subject: '',
    term: '',
    score: '',
    remarks: ''
  });

  const handleShowStatistics = () => {
    setShowStatistics(true);
  };

  const handleGenerateChart = () => {
    if (selectedStudent) {
      const data = generatePerformanceData(selectedStudent);
      setChartData(data);
      setShowChart(true);
    }
  };

  const handleFormSubmit = () => {
    console.log('Evaluation submitted:', formData);
    setShowEvalForm(false);
    setFormData({
      student: '',
      class: '',
      subject: '',
      term: '',
      score: '',
      remarks: ''
    });
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-xl shadow-2xl border-2 border-blue-500">
          <p className="font-bold text-gray-800 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm font-semibold">
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="w-64 bg-gradient-to-b from-blue-950 via-blue-900 to-blue-950 text-white shadow-2xl"
      >
        <div className="p-6">
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold mb-2"
          >
            Student Portal
          </motion.h1>
        </div>

        <nav className="px-3 space-y-1">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                onClick={() => setActiveNav(item.name)}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-3 ${
                  activeNav === item.name
                    ? "bg-blue-700 shadow-lg shadow-blue-900/50"
                    : "hover:bg-blue-800/50"
                }`}
                whileHover={{ x: 8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </motion.button>
            );
          })}
        </nav>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow-lg p-6 flex justify-between items-center sticky top-0 z-10"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Student Evaluation
          </h2>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowEvalForm(true)}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            >
              <Check className="w-5 h-5" />
              New Evaluation
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShowStatistics}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            >
              <BarChart3 className="w-5 h-5" />
              Performance Statistics
            </motion.button>
          </div>
        </motion.div>

        {/* Evaluation List */}
        <div className="p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6">
              <h3 className="text-2xl font-bold text-white">Recent Evaluations</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Student</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Class</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Subject</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Term</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Score</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Evaluated By</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {mockEvaluations.map((evaluation, index) => (
                    <motion.tr
                      key={evaluation.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-b border-gray-100 hover:bg-blue-50/50 transition-all"
                    >
                      <td className="px-6 py-4 font-semibold text-gray-800">{evaluation.student}</td>
                      <td className="px-6 py-4 text-gray-700">{evaluation.class}</td>
                      <td className="px-6 py-4 text-gray-700">{evaluation.subject}</td>
                      <td className="px-6 py-4 text-gray-700">{evaluation.term}</td>
                      <td className="px-6 py-4">
                        <span className={`px-4 py-2 rounded-full font-bold ${
                          evaluation.score >= 90 ? 'bg-green-100 text-green-700' :
                          evaluation.score >= 75 ? 'bg-blue-100 text-blue-700' :
                          evaluation.score >= 60 ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {evaluation.score}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{evaluation.evaluatedBy}</td>
                      <td className="px-6 py-4 text-gray-600">{evaluation.date}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>

      {/* New Evaluation Form Modal */}
      <AnimatePresence>
        {showEvalForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowEvalForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto"
            >
              <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white p-6 rounded-t-3xl flex justify-between items-center">
                <h3 className="text-3xl font-bold">New Evaluation</h3>
                <button onClick={() => setShowEvalForm(false)} className="p-2 hover:bg-white/20 rounded-full">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Class</label>
                    <select
                      value={formData.class}
                      onChange={(e) => setFormData({...formData, class: e.target.value, student: ''})}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                    >
                      <option value="">Select Class</option>
                      {mockClasses.map(cls => (
                        <option key={cls} value={cls}>{cls}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Student</label>
                    <select
                      value={formData.student}
                      onChange={(e) => setFormData({...formData, student: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                      disabled={!formData.class}
                    >
                      <option value="">Select Student</option>
                      {formData.class && mockStudents[formData.class]?.map(student => (
                        <option key={student} value={student}>{student}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Subject</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                    >
                      <option value="">Select Subject</option>
                      {mockSubjects.map(subject => (
                        <option key={subject.id} value={subject.name}>{subject.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Term</label>
                    <select
                      value={formData.term}
                      onChange={(e) => setFormData({...formData, term: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                    >
                      <option value="">Select Term</option>
                      {mockTerms.map(term => (
                        <option key={term} value={term}>{term}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Score (0-100)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.score}
                    onChange={(e) => setFormData({...formData, score: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Remarks</label>
                  <textarea
                    value={formData.remarks}
                    onChange={(e) => setFormData({...formData, remarks: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none h-32"
                    placeholder="Enter evaluation remarks..."
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleFormSubmit}
                  className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold text-xl shadow-lg"
                >
                  Submit Evaluation
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Performance Statistics Modal */}
      <AnimatePresence>
        {showStatistics && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => {
              setShowStatistics(false);
              setShowChart(false);
              setSelectedClass('');
              setSelectedStudent('');
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-auto"
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-t-3xl flex justify-between items-center sticky top-0 z-10">
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-8 h-8" />
                  <h3 className="text-3xl font-bold">Performance Statistics</h3>
                </div>
                <button
                  onClick={() => {
                    setShowStatistics(false);
                    setShowChart(false);
                    setSelectedClass('');
                    setSelectedStudent('');
                  }}
                  className="p-2 hover:bg-white/20 rounded-full"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6">
                {/* Filters */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                      <Filter className="w-4 h-4" />
                      Select Class
                    </label>
                    <select
                      value={selectedClass}
                      onChange={(e) => {
                        setSelectedClass(e.target.value);
                        setSelectedStudent('');
                        setShowChart(false);
                      }}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none bg-white shadow-sm"
                    >
                      <option value="">Choose a class...</option>
                      {mockClasses.map(cls => (
                        <option key={cls} value={cls}>{cls}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Select Student
                    </label>
                    <select
                      value={selectedStudent}
                      onChange={(e) => setSelectedStudent(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none bg-white shadow-sm"
                      disabled={!selectedClass}
                    >
                      <option value="">Choose a student...</option>
                      {selectedClass && mockStudents[selectedClass]?.map(student => (
                        <option key={student} value={student}>{student}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Generate Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGenerateChart}
                  disabled={!selectedStudent}
                  className={`w-full py-4 rounded-xl font-bold text-xl shadow-lg mb-8 ${
                    selectedStudent
                      ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:shadow-xl'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Generate Performance Chart
                </motion.button>

                {/* Chart Display */}
                <AnimatePresence>
                  {showChart && chartData.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                    >
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200 mb-6">
                        <h4 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                          <TrendingUp className="w-6 h-6 text-purple-600" />
                          {selectedStudent}'s Performance Across Terms
                        </h4>
                        
                        <ResponsiveContainer width="100%" height={400}>
                          <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                            <XAxis 
                              dataKey="term" 
                              stroke="#6B7280"
                              style={{ fontSize: '14px', fontWeight: 'bold' }}
                            />
                            <YAxis 
                              domain={[0, 100]}
                              stroke="#6B7280"
                              style={{ fontSize: '14px', fontWeight: 'bold' }}
                              label={{ value: 'Score', angle: -90, position: 'insideLeft', style: { fontWeight: 'bold' } }}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend 
                              wrapperStyle={{ paddingTop: '20px', fontWeight: 'bold' }}
                            />
                            {mockSubjects.map(subject => (
                              <Line
                                key={subject.id}
                                type="monotone"
                                dataKey={subject.name}
                                stroke={subject.color}
                                strokeWidth={3}
                                dot={{ r: 6, strokeWidth: 2, fill: '#fff' }}
                                activeDot={{ r: 8 }}
                              />
                            ))}
                          </LineChart>
                        </ResponsiveContainer>
                      </div>

                      {/* Subject Legend */}
                      <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <h5 className="text-xl font-bold text-gray-800 mb-4">Subject Color Guide</h5>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                          {mockSubjects.map(subject => (
                            <motion.div
                              key={subject.id}
                              whileHover={{ scale: 1.05 }}
                              className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all"
                            >
                              <div 
                                className="w-8 h-8 rounded-lg shadow-md"
                                style={{ backgroundColor: subject.color }}
                              />
                              <span className="font-semibold text-gray-700">{subject.name}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Performance Summary */}
                      <div className="mt-6 grid grid-cols-3 gap-4">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="bg-gradient-to-br from-green-100 to-emerald-100 p-6 rounded-xl border-2 border-green-300"
                        >
                          <p className="text-sm text-gray-600 font-semibold mb-1">Highest Score</p>
                          <p className="text-4xl font-bold text-green-700">
                            {Math.max(...chartData.flatMap(term => mockSubjects.map(s => term[s.name])))}
                          </p>
                        </motion.div>

                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="bg-gradient-to-br from-blue-100 to-cyan-100 p-6 rounded-xl border-2 border-blue-300"
                        >
                          <p className="text-sm text-gray-600 font-semibold mb-1">Average Score</p>
                          <p className="text-4xl font-bold text-blue-700">
                            {Math.round(
                              chartData.flatMap(term => mockSubjects.map(s => term[s.name]))
                                .reduce((a, b) => a + b, 0) / (chartData.length * mockSubjects.length)
                            )}
                          </p>
                        </motion.div>

                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="bg-gradient-to-br from-purple-100 to-pink-100 p-6 rounded-xl border-2 border-purple-300"
                        >
                          <p className="text-sm text-gray-600 font-semibold mb-1">Terms Tracked</p>
                          <p className="text-4xl font-bold text-purple-700">{chartData.length}</p>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Empty State */}
                {!showChart && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                  >
                    <BarChart3 className="w-24 h-24 text-gray-300 mx-auto mb-4" />
                    <p className="text-xl text-gray-500 font-semibold">
                      Select a class and student to view performance statistics
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EvaluationPortal;