
import { IoIosList } from "react-icons/io";

interface MoveHistoryProps {
  moves: string[]; 
}

export default function MoveHistory({ moves }: MoveHistoryProps) {
  // change the props to use the store of the gameStore 
  const movePairs = [];
  for (let i = 0; i < moves.length; i += 2) {
    movePairs.push({
      number: Math.floor(i / 2) + 1,
      whiteMove: moves[i],
      blackMove: moves[i + 1] || '',
    });
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm w-full max-w-sm p-4">
      {/* Title */}
      <div className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
        <IoIosList />
        Move History
      </div>

      {/* Moves List */}
      <div className="text-sm text-gray-700 divide-y divide-gray-100">
        {movePairs.map((pair, idx) => {
          const isLast = idx === movePairs.length - 1;
          return (
            <div
              key={pair.number}
              className={`flex items-center justify-start py-1.5 px-2 rounded-md transition ${
                isLast
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "hover:bg-gray-50"
              }`}
            >
              <span className="w-8 text-gray-500">{pair.number}.</span>
              <span className="w-20">{pair.whiteMove}</span>
              <span
                className={`w-20 ${
                  isLast ? "text-blue-600 font-semibold" : ""
                }`}
              >
                {pair.blackMove}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}