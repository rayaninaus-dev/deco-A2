import React, { useState, useEffect } from "react";

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  min?: string;
  required?: boolean;
  className?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({ 
  value, 
  onChange, 
  min, 
  required = false, 
  className = "" 
}) => {
  const [displayValue, setDisplayValue] = useState("dd/mm/yyyy");

  useEffect(() => {
    if (value) {
      // 将YYYY-MM-DD格式转换为DD/MM/YYYY显示
      const [year, month, day] = value.split('-');
      setDisplayValue(`${day}/${month}/${year}`);
    } else {
      // 默认显示占位格式
      setDisplayValue("dd/mm/yyyy");
    }
  }, [value]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="relative">
      <input
        type="date"
        value={value}
        onChange={handleDateChange}
        min={min}
        className={`w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
        lang="en-GB"
        required={required}
        style={{
          // 强制使用英国日期格式 (DD/MM/YYYY)
          colorScheme: "light",
          // 隐藏原生输入框内的本地化文本，改用自定义覆盖文本
          color: "transparent",
          caretColor: "transparent"
        }}
      />
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <span className="text-sm text-gray-700">{displayValue}</span>
      </div>
    </div>
  );
};

export default DatePicker;
