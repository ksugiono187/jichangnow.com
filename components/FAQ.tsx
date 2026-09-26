export function FAQ({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="border-b border-slate-200 py-4">
      <h3 className="text-lg font-medium text-slate-900 mb-2">{question}</h3>
      <p className="text-slate-600">{answer}</p>
    </div>
  );
}
