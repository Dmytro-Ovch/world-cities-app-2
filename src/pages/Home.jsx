import Header from "./Header";
import EntryList from "./EntryList";

export default function Home() {
  return (
    <div className="flex flex-col gap-12">
      <Header />
      <EntryList />
    </div>
  );
}
