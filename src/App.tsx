export default function App() {
  const env = process.env.VITE_MY_KEY;
  return (
    <div className="text-gomao bg-green-50" style={{ padding: 15 }}>
      my project : {env} from env
    </div>
  );
}
