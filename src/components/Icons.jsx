import {PanelsTopLeft, Cpu, Network, Settings, Gamepad2, Monitor, SquareTerminal, MonitorCog} from "lucide-react";


const Icons = ({ category }) => {
  
  switch (category)
  {
    case "network":
      return (
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
          <Network className="text-blue-500 w-5 h-5"/>
        </div>
          );
    case "low-level":
      return (
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-100">
          <Cpu className="text-orange-500 w-5 h-5"/>
        </div>
          );
    case "frontend":
      return (
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-pink-100">
          <Monitor className="text-pink-500 w-5 h-5"/>
        </div>
          );
    case "backend":
      return (
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100">
          <MonitorCog className="text-green-500 w-5 h-5"/>
        </div>
          );
    case "game":
      return (
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100">
          <Gamepad2 className="text-red-500 w-5 h-5"/>
        </div>
          );
    case "compiler":
      return (
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-100">
          <Settings className="text-purple-500 w-5 h-5"/>
        </div>
          );
    case "ide":
      return (
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-100">
          <PanelsTopLeft className="text-yellow-500 w-5 h-5"/>
        </div>
          );
    default:
      return (
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
          <SquareTerminal className="text-gray-500 w-5 h-5"/>
        </div>
          );
  };
}
export default Icons;