import { useState } from "react";
import {
  Calculator,
  User,
  Scale,
  Ruler,
  Calendar,
  Activity,
  Zap,
  TrendingUp,
  Heart,
  Info,
} from "lucide-react";

export default function BMRCalculator() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showFormula, setShowFormula] = useState(false);
  const [animateResult, setAnimateResult] = useState(false);

  const handleNameChange = (e) => setName(e.target.value);
  const handleGenderChange = (value) => setGender(value);
  const handleAgeChange = (e) => setAge(e.target.value);
  const handleWeightChange = (e) => setWeight(e.target.value);
  const handleHeightChange = (e) => setHeight(e.target.value);

  const isFormValid =
    age &&
    weight &&
    height &&
    parseFloat(age) > 0 &&
    parseFloat(weight) > 0 &&
    parseFloat(height) > 0;

  const calculate = async () => {
    if (!isFormValid) {
      return;
    }

    setIsCalculating(true);
    setAnimateResult(false);

    // Simulate calculation time for better UX
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const ageNum = parseFloat(age);
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    let bmr;
    if (gender === "male") {
      bmr = 88.362 + 13.397 * weightNum + 4.799 * heightNum - 5.677 * ageNum;
    } else {
      bmr = 447.593 + 9.247 * weightNum + 3.098 * heightNum - 4.33 * ageNum;
    }

    const bmrRounded = Math.round(bmr);
    const sedentary = Math.round(bmr * 1.2);
    const lightActive = Math.round(bmr * 1.375);
    const moderate = Math.round(bmr * 1.55);
    const active = Math.round(bmr * 1.725);

    setResult({
      name: name || "ไม่ระบุชื่อ",
      gender: gender,
      age: ageNum,
      weight: weightNum,
      height: heightNum,
      bmr: bmrRounded,
      activityLevels: { sedentary, lightActive, moderate, active },
      formula:
        gender === "male" ? "Harris-Benedict (ชาย)" : "Harris-Benedict (หญิง)",
    });

    setIsCalculating(false);
    setAnimateResult(true);
  };

  const clearData = () => {
    setName("");
    setGender("male");
    setAge("");
    setWeight("");
    setHeight("");
    setResult(null);
    setAnimateResult(false);
  };

  const activityData = [
    {
      key: "sedentary",
      label: "นั่งทำงาน",
      description: "ไม่ค่อยออกกำลังกาย",
      bgClass: "bg-gradient-to-br from-blue-50 to-blue-100",
      borderClass: "border-blue-200",
      textClass: "text-blue-800",
      numberClass: "text-blue-900",
      descClass: "text-blue-600",
      icon: "💼",
    },
    {
      key: "lightActive",
      label: "กิจกรรมเบา",
      description: "1-3 วัน/สัปดาห์",
      bgClass: "bg-gradient-to-br from-green-50 to-green-100",
      borderClass: "border-green-200",
      textClass: "text-green-800",
      numberClass: "text-green-900",
      descClass: "text-green-600",
      icon: "🚶",
    },
    {
      key: "moderate",
      label: "กิจกรรมปานกลาง",
      description: "3-5 วัน/สัปดาห์",
      bgClass: "bg-gradient-to-br from-orange-50 to-orange-100",
      borderClass: "border-orange-200",
      textClass: "text-orange-800",
      numberClass: "text-orange-900",
      descClass: "text-orange-600",
      icon: "🏃",
    },
    {
      key: "active",
      label: "กิจกรรมหนัก",
      description: "6-7 วัน/สัปดาห์",
      bgClass: "bg-gradient-to-br from-red-50 to-red-100",
      borderClass: "border-red-200",
      textClass: "text-red-800",
      numberClass: "text-red-900",
      descClass: "text-red-600",
      icon: "💪",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-300/10 to-blue-500/10 rounded-full blur-3xl animate-spin"
          style={{ animationDuration: "20s" }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg mb-6 transform hover:scale-105 transition-transform duration-300">
            <Calculator className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-4">
            BMR Calculator
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            คำนวณอัตราการเผาผลาญพื้นฐานของร่างกายคุณด้วยสูตร Harris-Benedict
            แบบแม่นยำ
          </p>
        </div>

        <div className="grid xl:grid-cols-5 gap-6 lg:gap-8">
          {/* Input Form */}
          <div className="xl:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6 lg:p-8 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <User className="w-6 h-6 text-indigo-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">กรอกข้อมูล</h2>
              </div>

              <div className="space-y-6">
                {/* Name Input */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    ชื่อ (ไม่บังคับ)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={name}
                      onChange={handleNameChange}
                      placeholder="ใส่ชื่อของคุณ"
                      className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:bg-white transition-all duration-300 text-lg group-hover:border-gray-300"
                    />
                    <User className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* Gender Selection */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-4">
                    เพศ
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      {
                        value: "male",
                        label: "ชาย",
                        icon: "👨",
                        color: "blue",
                      },
                      {
                        value: "female",
                        label: "หญิง",
                        icon: "👩",
                        color: "pink",
                      },
                    ].map(({ value, label, icon, color }) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => handleGenderChange(value)}
                        className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
                          gender === value
                            ? `border-${color}-500 bg-${color}-50 shadow-md scale-105`
                            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-2xl mb-2">{icon}</div>
                          <div
                            className={`font-semibold ${
                              gender === value
                                ? `text-${color}-700`
                                : "text-gray-700"
                            }`}
                          >
                            {label}
                          </div>
                        </div>
                        {gender === value && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Age Input */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    อายุ (ปี)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={age}
                      onChange={handleAgeChange}
                      placeholder="ใส่อายุของคุณ"
                      min="1"
                      max="120"
                      className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:bg-white transition-all duration-300 text-lg group-hover:border-gray-300"
                    />
                    <Calendar className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* Weight Input */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    น้ำหนัก (กิโลกรัม)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={weight}
                      onChange={handleWeightChange}
                      placeholder="ใส่น้ำหนักของคุณ"
                      step="0.1"
                      min="1"
                      max="300"
                      className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:bg-white transition-all duration-300 text-lg group-hover:border-gray-300"
                    />
                    <Scale className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* Height Input */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    ส่วนสูง (เซนติเมตร)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={height}
                      onChange={handleHeightChange}
                      placeholder="ใส่ส่วนสูงของคุณ"
                      step="0.1"
                      min="50"
                      max="250"
                      className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:bg-white transition-all duration-300 text-lg group-hover:border-gray-300"
                    />
                    <Ruler className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    onClick={calculate}
                    disabled={!isFormValid || isCalculating}
                    className={`flex-1 py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
                      isFormValid && !isCalculating
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {isCalculating ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent mr-3"></div>
                        กำลังคำนวณ...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Calculator className="w-5 h-5 mr-2" />
                        คำนวณ BMR
                      </div>
                    )}
                  </button>
                  <button
                    onClick={clearData}
                    className="px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
                  >
                    เคลียร์
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="xl:col-span-3">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6 lg:p-8 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <TrendingUp className="w-6 h-6 text-indigo-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">ผลลัพธ์</h2>
                </div>
                {result && (
                  <button
                    onClick={() => setShowFormula(!showFormula)}
                    className="flex items-center text-sm text-indigo-600 hover:text-indigo-700 transition-colors"
                  >
                    <Info className="w-4 h-4 mr-1" />
                    สูตรคำนวณ
                  </button>
                )}
              </div>

              {result ? (
                <div
                  className={`space-y-8 transition-all duration-1000 ${
                    animateResult
                      ? "opacity-100 transform translate-y-0"
                      : "opacity-0 transform translate-y-4"
                  }`}
                >
                  {/* Personal Info */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mr-4">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-blue-900">
                          สวัสดี {result.name}!
                        </h3>
                        <p className="text-blue-700">ข้อมูลส่วนตัวของคุณ</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      {[
                        {
                          label: "เพศ",
                          value: result.gender === "male" ? "ชาย" : "หญิง",
                          icon: result.gender === "male" ? "👨" : "👩",
                        },
                        {
                          label: "อายุ",
                          value: `${result.age} ปี`,
                          icon: "🎂",
                        },
                        {
                          label: "น้ำหนัก",
                          value: `${result.weight} กก.`,
                          icon: "⚖️",
                        },
                        {
                          label: "ส่วนสูง",
                          value: `${result.height} ซม.`,
                          icon: "📏",
                        },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="text-center p-3 bg-white/70 rounded-xl"
                        >
                          <div className="text-2xl mb-1">{item.icon}</div>
                          <div className="text-xs text-blue-600 font-medium">
                            {item.label}
                          </div>
                          <div className="text-sm font-bold text-blue-900">
                            {item.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Main BMR Result */}
                  <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
                    <div className="relative z-10">
                      <div className="flex items-center mb-4">
                        <Zap className="w-8 h-8 mr-3" />
                        <h3 className="text-2xl font-bold">
                          BMR (อัตราการเผาผลาญพื้นฐาน)
                        </h3>
                      </div>
                      <div className="text-5xl lg:text-6xl font-bold mb-2">
                        {result.bmr.toLocaleString()}
                      </div>
                      <p className="text-xl text-white/90">
                        แคลอรี่ต่อวัน (ไม่นับกิจกรรม)
                      </p>
                      <div className="mt-6 flex items-center text-white/80">
                        <Heart className="w-4 h-4 mr-2" />
                        <span className="text-sm">สูตร: {result.formula}</span>
                      </div>
                    </div>
                  </div>

                  {/* Activity Levels */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <Activity className="w-6 h-6 mr-3 text-indigo-600" />
                      แคลอรี่ตามระดับกิจกรรม
                    </h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {activityData.map((activity, index) => (
                        <div
                          key={activity.key}
                          className={`${activity.bgClass} border-2 ${activity.borderClass} rounded-2xl p-6 hover:scale-105 transition-all duration-300 hover:shadow-lg`}
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <div className="text-center">
                            <div className="text-3xl mb-3">{activity.icon}</div>
                            <div
                              className={`text-sm font-bold ${activity.textClass} mb-2`}
                            >
                              {activity.label}
                            </div>
                            <div
                              className={`text-2xl lg:text-3xl font-bold ${activity.numberClass} mb-2`}
                            >
                              {result.activityLevels[
                                activity.key
                              ].toLocaleString()}
                            </div>
                            <div className={`text-xs ${activity.descClass}`}>
                              {activity.description}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Formula Display */}
                  {showFormula && (
                    <div className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-200 animate-fadeIn">
                      <h4 className="text-lg font-bold text-gray-900 mb-4">
                        📐 สูตร Harris-Benedict
                      </h4>
                      <div className="grid lg:grid-cols-2 gap-4">
                        <div className="bg-blue-100 p-4 rounded-xl border border-blue-200">
                          <h5 className="font-bold text-blue-800 mb-2">
                            ผู้ชาย:
                          </h5>
                          <code className="text-sm text-blue-700 break-all">
                            BMR = 88.362 + (13.397 × น้ำหนัก) + (4.799 ×
                            ส่วนสูง) - (5.677 × อายุ)
                          </code>
                        </div>
                        <div className="bg-pink-100 p-4 rounded-xl border border-pink-200">
                          <h5 className="font-bold text-pink-800 mb-2">
                            ผู้หญิง:
                          </h5>
                          <code className="text-sm text-pink-700 break-all">
                            BMR = 447.593 + (9.247 × น้ำหนัก) + (3.098 ×
                            ส่วนสูง) - (4.330 × อายุ)
                          </code>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Calculator className="w-12 h-12 text-gray-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-700 mb-2">
                    กรอกข้อมูลเพื่อคำนวณ BMR
                  </h3>
                  <p className="text-gray-500">
                    ใส่ข้อมูลส่วนตัวของคุณแล้วกดปุ่ม "คำนวณ BMR" เพื่อดูผลลัพธ์
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50 max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <Heart className="w-5 h-5 text-red-500 mr-2" />
              <span className="text-lg font-semibold text-gray-800">
                BMR Calculator
              </span>
            </div>
            <p className="text-gray-600 mb-2">
              สร้างด้วย React และ Tailwind CSS | คำนวณด้วยสูตร Harris-Benedict
            </p>
            <p className="text-sm text-gray-500">
              ⚠️ ผลการคำนวณเป็นเพียงการประมาณ
              ควรปรึกษาแพทย์หรือนักโภชนาการสำหรับคำแนะนำเฉพาะบุคคล
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
