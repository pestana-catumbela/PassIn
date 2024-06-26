import { AttendeeList } from "./components/attendee-list";
import { HeaderComponent } from "./components/header-component";

export function App() {
  return (
    <>
      <div className="max-w-[1232px] mx-auto py-5">
        <HeaderComponent />
        <AttendeeList />
      </div>
    </>
  )
}
