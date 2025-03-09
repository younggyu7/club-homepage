import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Navbar from "../components/Navbar";

export default function Schedule() {
  const [date, setDate] = useState(new Date());

  // 예제 일정 데이터
  const events = [
    { date: "2025-03-10", title: "동아리 정기 회의" },
    { date: "2025-03-12", title: "스터디 모임" },
    { date: "2025-03-15", title: "프로젝트 발표" }
  ];

  // 선택한 날짜의 일정 필터링
  const selectedDate = date.toISOString().split("T")[0]; // YYYY-MM-DD 포맷
  const filteredEvents = events.filter(event => event.date === selectedDate);

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h2 className="text-2xl font-bold">📅 일정 관리</h2>

        {/* 캘린더 */}
        <div className="mt-4">
          <Calendar onChange={setDate} value={date} />
        </div>

        {/* 선택한 날짜의 일정 표시 */}
        <div className="mt-6">
          <h3 className="text-xl font-bold">📌 {selectedDate} 일정</h3>
          {filteredEvents.length > 0 ? (
            <ul className="mt-2 space-y-2">
              {filteredEvents.map((event, index) => (
                <li key={index} className="border p-4 rounded">
                  {event.title}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-gray-500">등록된 일정이 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}

