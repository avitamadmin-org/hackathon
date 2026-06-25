"use client";

import { useState } from "react";
import {
  Trophy,
  Plus,
  X,
  Pencil,
  Trash2,
  CheckCircle2,
  Sparkles,
  Award,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface ScoreCriterion {
  score: number;
  description: string;
}

interface Criterion {
  id: string;
  title: string;
  scoreCriteria: ScoreCriterion[];
  points: number;
  weight: number;
}

const defaultCriteria: Criterion[] = [
  {
    id: "1",
    title: "React Native Fundamentals",
    scoreCriteria: [
      {
        score: 1,
        description:
          "Poor - Navigation missing or broken. Screens not structured properly.",
      },
      {
        score: 2,
        description:
          "Fair - Basic navigation exists but inconsistent across screens.",
      },
      {
        score: 3,
        description:
          "Good - Reusable components implemented with acceptable structure.",
      },
      {
        score: 4,
        description:
          "Very Good - Well-organized screens with good state management.",
      },
      {
        score: 5,
        description:
          "Excellent - Production-ready architecture and best practices followed.",
      },
    ],
    points: 5,
    weight: 15,
  },
  {
    id: "2",
    title: "API Integration & Token Handling",
    scoreCriteria: [
      {
        score: 1,
        description: "Poor - No API integration or token handling implemented.",
      },
      {
        score: 2,
        description:
          "Fair - API calls exist but are hardcoded and error-prone.",
      },
      {
        score: 3,
        description:
          "Good - API integration works with basic token management.",
      },
      {
        score: 4,
        description:
          "Very Good - Proper interceptors and error handling implemented.",
      },
      {
        score: 5,
        description:
          "Excellent - Secure token refresh strategy and scalable API architecture.",
      },
    ],
    points: 5,
    weight: 20,
  },
  {
    id: "3",
    title: "Role-Based Screens & Workflows",
    scoreCriteria: [
      {
        score: 1,
        description:
          "Poor - No role-based functionality or workflows available.",
      },
      {
        score: 2,
        description: "Fair - Some roles implemented but workflows incomplete.",
      },
      {
        score: 3,
        description: "Good - Core role-based flows functioning correctly.",
      },
      {
        score: 4,
        description:
          "Very Good - Most workflows implemented with proper restrictions.",
      },
      {
        score: 5,
        description:
          "Excellent - Fully functional role management with seamless UX.",
      },
    ],
    points: 5,
    weight: 20,
  },
  {
    id: "4",
    title: "Mobile UX & Reliability",
    scoreCriteria: [
      {
        score: 1,
        description:
          "Poor - Frequent crashes, poor UI, and missing validations.",
      },
      {
        score: 2,
        description:
          "Fair - Basic UI available but limited validation and stability.",
      },
      {
        score: 3,
        description:
          "Good - Stable experience with common validations implemented.",
      },
      {
        score: 4,
        description:
          "Very Good - Strong UX with proper loading and error states.",
      },
      {
        score: 5,
        description:
          "Excellent - Smooth, polished, and highly reliable user experience.",
      },
    ],
    points: 5,
    weight: 20,
  },
  {
    id: "5",
    title: "Data Models & POS/Hospital Entities",
    scoreCriteria: [
      {
        score: 1,
        description: "Poor - Data models are missing or poorly structured.",
      },
      {
        score: 2,
        description: "Fair - Basic models implemented with limited validation.",
      },
      {
        score: 3,
        description:
          "Good - Well-defined models with proper entity relationships.",
      },
      {
        score: 4,
        description:
          "Very Good - Strong validation and optimized data structure.",
      },
      {
        score: 5,
        description:
          "Excellent - Enterprise-grade data modeling and architecture.",
      },
    ],
    points: 5,
    weight: 15,
  },
];

export default function EvaluationCriteriaPage() {
  const [criteria, setCriteria] = useState<Criterion[]>(defaultCriteria);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCriterion, setEditingCriterion] = useState<Criterion | null>(
    null
  );
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  const [scoreCriteria, setScoreCriteria] = useState<ScoreCriterion[]>([
    {
      score: 1,
      description: "",
    },
  ]);
  const [formTitle, setFormTitle] = useState("");
  const [formPoints, setFormPoints] = useState(5);
  const [formWeight, setFormWeight] = useState(10);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalWeight = criteria.reduce((sum, item) => sum + item.weight, 0);

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedCards(newExpanded);
  };

  const openAddModal = () => {
    setEditingCriterion(null);
    setFormTitle("");
    setFormPoints(5);
    setFormWeight(10);
    setScoreCriteria([{ score: 1, description: "" }]);
    setErrors({});
    setIsModalOpen(true);
  };

  const openEditModal = (criterion: Criterion) => {
    setEditingCriterion(criterion);
    setFormTitle(criterion.title);
    setScoreCriteria(criterion.scoreCriteria);
    setFormPoints(criterion.points);
    setFormWeight(criterion.weight);
    setErrors({});
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setCriteria(criteria.filter((item) => item.id !== id));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formTitle.trim()) newErrors.title = "Title is required";
    if (scoreCriteria.length === 0) {
      newErrors.scoreCriteria = "At least one score is required";
    }

    const invalidScore = scoreCriteria.some((item) => !item.description.trim());

    if (invalidScore) {
      newErrors.scoreCriteria = "All score descriptions are required";
    }
    if (formPoints <= 0) newErrors.points = "Points must be greater than 0";
    if (formWeight <= 0) newErrors.weight = "Weight must be greater than 0%";

    const currentTotal = criteria
      .filter((item) => !editingCriterion || item.id !== editingCriterion.id)
      .reduce((sum, item) => sum + item.weight, 0);

    if (currentTotal + formWeight > 100) {
      newErrors.weight = `Total weight cannot exceed 100% (currently ${
        currentTotal + formWeight
      }%)`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setEditingCriterion(null);
    setFormTitle("");
    setFormPoints(5);
    setFormWeight(10);
    setScoreCriteria([{ score: 1, description: "" }]);
    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (editingCriterion) {
      setCriteria(
        criteria.map((item) =>
          item.id === editingCriterion.id
            ? {
                ...item,
                title: formTitle.trim(),
                scoreCriteria: scoreCriteria,
                points: formPoints,
                weight: formWeight,
              }
            : item
        )
      );
    } else {
      const newItem: Criterion = {
        id: Date.now().toString(),
        title: formTitle.trim(),
        scoreCriteria,
        points: formPoints,
        weight: formWeight,
      };
      setCriteria([...criteria, newItem]);
    }
    resetForm();
    setIsModalOpen(false);
  };

  const addScoreCriterion = () => {
    setScoreCriteria((prev) => [
      ...prev,
      {
        score: prev.length + 1,
        description: "",
      },
    ]);
  };

  const updateScoreCriterion = (
    index: number,
    field: "score" | "description",
    value: string | number
  ) => {
    const updated = [...scoreCriteria];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    setScoreCriteria(updated);
  };

  const removeScoreCriterion = (index: number) => {
    setScoreCriteria((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-50/80 p-4 sm:p-6">
      <div className="w-full max-w-7xl mx-auto">
        {/* Title Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8 border-b border-gray-100 pb-4 sm:pb-6">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="p-2 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg shadow-blue-500/20">
                <Award className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                Evaluation Criteria
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 ml-12 sm:ml-14">
              Define the evaluation criteria and scoring system for submissions
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 self-start sm:self-center">
            <div
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full border text-xs font-semibold ${
                totalWeight === 100
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-amber-50 text-amber-700 border-amber-200"
              }`}
            >
              <CheckCircle2
                size={14}
                className={
                  totalWeight === 100 ? "text-emerald-500" : "text-amber-500"
                }
              />
              <span>{totalWeight}/100</span>
            </div>
            <button
              onClick={openAddModal}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-xl text-sm font-medium shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all hover:scale-105"
            >
              <Plus size={16} />
              <span>Add Criteria</span>
            </button>
          </div>
        </div>

        {/* Criteria Cards List */}
        <div className="space-y-3 sm:space-y-4">
          {criteria.length === 0 ? (
            <div className="text-center py-12 sm:py-16 border-2 border-dashed border-gray-200 rounded-3xl">
              <Trophy className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">No evaluation criteria defined</p>
              <p className="text-sm text-gray-400 mt-1">
                Get started by clicking Add Criteria
              </p>
            </div>
          ) : (
            criteria.map((item, index) => {
              const letter = String.fromCharCode(65 + index);
              const isExpanded = expandedCards.has(item.id);
              const displayCriteria = isExpanded 
                ? item.scoreCriteria 
                : item.scoreCriteria.slice(0, 2);

              return (
                <div
                  key={item.id}
                  className="group flex flex-col p-4 sm:p-5 bg-white border border-gray-200 rounded-2xl shadow-xs hover:shadow-md transition-all duration-300 gap-3 sm:gap-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="flex items-start gap-3 sm:gap-4 flex-1">
                      <div className="p-2.5 sm:p-3 bg-linear-to-br from-blue-50 to-indigo-50 border border-blue-100/50 rounded-xl sm:rounded-2xl shrink-0 flex items-center justify-center">
                        <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm sm:text-base font-semibold text-gray-900 break-words">
                          {letter}. {item.title}
                        </h4>
                        <div className="mt-2 space-y-1">
                          {displayCriteria.map((scoreItem, idx) => (
                            <div
                              key={idx}
                              className="text-xs sm:text-sm text-gray-500 flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2"
                            >
                              <span className="font-medium text-blue-600 whitespace-nowrap">
                                Score {scoreItem.score}:
                              </span>
                              <span className="break-words">{scoreItem.description}</span>
                            </div>
                          ))}
                          {item.scoreCriteria.length > 2 && (
                            <button
                              onClick={() => toggleExpand(item.id)}
                              className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium mt-1"
                            >
                              {isExpanded ? (
                                <>Show less <ChevronUp size={14} /></>
                              ) : (
                                <>Show {item.scoreCriteria.length - 2} more <ChevronDown size={14} /></>
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-50">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <span className="px-2.5 sm:px-3 py-1 bg-blue-50/80 text-blue-700 text-xs sm:text-sm font-medium rounded-lg border border-blue-100/50 whitespace-nowrap">
                          {item.points} pts
                        </span>
                        <span className="px-2.5 sm:px-3 py-1 bg-gray-100 text-gray-700 text-xs sm:text-sm font-medium rounded-lg border border-gray-200/30 whitespace-nowrap">
                          {item.weight}%
                        </span>
                      </div>

                      <div className="flex items-center gap-1 ml-1 sm:ml-2">
                        <button
                          onClick={() => openEditModal(item)}
                          className="p-1.5 sm:p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all"
                          title="Edit Criteria"
                        >
                          <Pencil size={14} className="sm:w-4 sm:h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-1.5 sm:p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                          title="Delete Criteria"
                        >
                          <Trash2 size={14} className="sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Add / Edit Modal Drawer */}
        {isModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-3 sm:p-4 animate-in fade-in duration-200"
            onClick={() => setIsModalOpen(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] bg-white rounded-2xl sm:rounded-3xl shadow-2xl transition-all duration-300 flex flex-col overflow-hidden animate-in scale-100 opacity-100"
            >
              {/* Modal Header */}
              <div className="relative bg-linear-to-r from-blue-500 to-blue-600 px-4 sm:px-6 py-4 sm:py-5 shrink-0 z-10">
                <div className="absolute top-0 right-0 w-32 sm:w-48 h-32 sm:h-48 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4" />
                <div className="absolute bottom-0 left-0 w-24 sm:w-32 h-24 sm:h-32 bg-white/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />

                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="p-2 sm:p-2.5 bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl">
                      <Award className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-semibold text-white">
                        {editingCriterion
                          ? "Edit Criteria"
                          : "Add Evaluation Criteria"}
                      </h2>
                      <p className="text-xs sm:text-sm text-white/80">
                        Define details, grading schema, and weight
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-1.5 sm:p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                  >
                    <X size={18} className="sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Form */}
              <form
                onSubmit={handleSubmit}
                className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6 flex flex-col justify-between space-y-4 sm:space-y-6"
              >
                <div className="space-y-4 sm:space-y-5">
                  {/* Title */}
                  <div>
                    <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                      Criteria Name / Title *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. React Native Fundamentals"
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400 ${
                        errors.title ? "border-red-500" : "border-gray-200"
                      }`}
                    />
                    {errors.title && (
                      <p className="text-xs text-red-500 mt-1">{errors.title}</p>
                    )}
                  </div>

                  {/* Scoring Rubric */}
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <label className="text-xs sm:text-sm font-medium text-gray-700">
                        Scoring Rubric *
                      </label>
                      <button
                        type="button"
                        onClick={addScoreCriterion}
                        className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 text-xs bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition whitespace-nowrap"
                      >
                        <Plus size={14} />
                        Add Score
                      </button>
                    </div>

                    <div className="space-y-2 sm:space-y-3">
                      {scoreCriteria.map((item, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-12 gap-2 sm:gap-3 items-start"
                        >
                          <div className="col-span-3 sm:col-span-3">
                            <input
                              type="number"
                              min={1}
                              value={item.score}
                              onChange={(e) =>
                                updateScoreCriterion(
                                  index,
                                  "score",
                                  Number(e.target.value)
                                )
                              }
                              className="w-full px-2 sm:px-4 py-2 sm:py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                              placeholder="Score"
                            />
                          </div>
                          <div className="col-span-7 sm:col-span-8">
                            <input
                              type="text"
                              value={item.description}
                              onChange={(e) =>
                                updateScoreCriterion(
                                  index,
                                  "description",
                                  e.target.value
                                )
                              }
                              placeholder="Enter score description"
                              className="w-full px-2 sm:px-4 py-2 sm:py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                            />
                          </div>
                          <div className="col-span-2 sm:col-span-1 flex justify-end">
                            {scoreCriteria.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeScoreCriterion(index)}
                                className="p-1.5 sm:p-2 text-red-500 hover:bg-red-50 rounded-lg"
                              >
                                <Trash2 size={14} className="sm:w-4 sm:h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Points and Weight Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                        Max Points *
                      </label>
                      <input
                        type="number"
                        placeholder="5"
                        value={formPoints || ""}
                        onChange={(e) =>
                          setFormPoints(Math.max(0, Number(e.target.value)))
                        }
                        className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400 ${
                          errors.points ? "border-red-500" : "border-gray-200"
                        }`}
                      />
                      {errors.points && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.points}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                        Weight Percentage (%) *
                      </label>
                      <input
                        type="number"
                        placeholder="15"
                        value={formWeight || ""}
                        onChange={(e) =>
                          setFormWeight(Math.max(0, Number(e.target.value)))
                        }
                        className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400 ${
                          errors.weight ? "border-red-500" : "border-gray-200"
                        }`}
                      />
                      {errors.weight && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.weight}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="flex flex-col sm:flex-row items-center justify-end gap-2 sm:gap-3 pt-4 sm:pt-6 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-xl transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-xl text-sm font-medium shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all hover:scale-105"
                  >
                    <Sparkles size={16} className="inline mr-2" />
                    {editingCriterion ? "Save Changes" : "Create Criteria"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}