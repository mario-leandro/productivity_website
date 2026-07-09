export default function Agenda() {
  //   const today = new Date();

  //   const month = today.getMonth(); // 0-11
  //   const year = today.getFullYear();

  //   const calendar = generateCalendar(year, month);

  return (
    <div className="flex flex-col p-6 gap-4 overflow-y-auto">
      {/* <CalendarHeader />
      <CalendarDays />
      <CalendarGrid /> */}
    </div>
  );
}

// function generateCalendar() {
//   const cells = [];

//   const firstDay = new Date(year, month, 1).getDay();

//   const daysInMonth = new Date(year, month + 1, 0).getDate();

//   const previousMonthDays = new Date(year, month, 0).getDate();

//   // dias do mês anterior
//   for (let i = firstDay - 1; i >= 0; i--) {
//     cells.push({
//       day: previousMonthDays - i,
//       currentMonth: false,
//     });
//   }

//   // dias do mês atual

//   for (let day = 1; day <= daysInMonth; day++) {
//     cells.push({
//       day,
//       currentMonth: true,
//     });
//   }

//   // dias do próximo mês

//   while (cells.length < 42) {
//     cells.push({
//       day: cells.length,
//       currentMonth: false,
//     });
//   }

//   return cells;
// }
