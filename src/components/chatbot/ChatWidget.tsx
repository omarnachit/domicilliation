"use client";

import { JSX, useMemo, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Message = {
  id: number;
  role: "bot" | "user";
  text: string;
};

function getBotReply(input: string): string {
  const q = input.toLowerCase();

  if (q.includes("contrat")) {
    return "Pour le contrat, ouvrez la page Contrats du dashboard. Vous y trouverez votre reference et le statut.";
  }
  if (q.includes("facture") || q.includes("paiement")) {
    return "Pour la facturation, allez dans Facturation pour voir les factures payees, en attente et en retard.";
  }
  if (q.includes("courrier") || q.includes("mail")) {
    return "Le suivi du courrier est disponible dans la section Courrier avec l'historique des receptions.";
  }
  if (q.includes("support") || q.includes("aide")) {
    return "Vous pouvez utiliser la page Support pour les actions rapides ou contacter support@domiciliation.ma.";
  }

  return "Je peux vous aider sur contrats, facturation, courrier et support. Dites-moi ce que vous cherchez.";
}

export function ChatWidget(): JSX.Element {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "bot",
      text: "Bonjour, je suis l'assistant. Posez une question sur votre espace client.",
    },
  ]);

  const canSend = useMemo(() => text.trim().length > 0, [text]);

  const handleSend = () => {
    const value = text.trim();
    if (!value) return;

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      text: value,
    };
    const botMessage: Message = {
      id: Date.now() + 1,
      role: "bot",
      text: getBotReply(value),
    };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setText("");
  };

  return (
    <div className="fixed top-5 right-5 z-50">
      {!open && (
        <Button
          type="button"
          onClick={() => setOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg rounded-full h-12 px-4"
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          Chat
        </Button>
      )}

      {open && (
        <div className="w-[340px] h-[480px] rounded-xl border border-zinc-200 bg-white shadow-2xl flex flex-col overflow-hidden">
          <div className="h-12 px-4 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
            <p className="text-sm font-semibold text-zinc-900">Assistant Domiciliation</p>
            <Button type="button" size="icon-sm" variant="ghost" onClick={() => setOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                  message.role === "user"
                    ? "ml-auto bg-indigo-600 text-white"
                    : "bg-zinc-100 text-zinc-800"
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-zinc-200 bg-white">
            <form
              className="flex items-center gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
            >
              <Input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Ecrivez votre question..."
              />
              <Button type="submit" size="icon" disabled={!canSend} className="bg-indigo-600 hover:bg-indigo-700">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
