import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const apiKey =
      process.env.SMS24_API_KEY || "a49d140c-38f2-4bb2-8838-a91af00b9164";
    const defaultSession = process.env.SMS24_SESSION_NAME || "1226237_test";

    type IncomingContact = {
      number?: string | number;
      message?: string;
      session_name?: string;
    };

    const normalizedContact: IncomingContact[] = Array.isArray(body?.contact)
      ? body.contact
      : [
          {
            number: body?.number,
            message: body?.message,
            session_name: body?.session_name,
          },
        ];

    const contact = normalizedContact
      .filter((item): item is Required<Pick<IncomingContact, "number" | "message">> & IncomingContact => {
        return Boolean(item?.number && item?.message);
      })
      .map((item) => ({
        number: String(item.number),
        message: String(item.message),
        session_name: item.session_name || defaultSession,
      }));

    if (!apiKey) {
      return NextResponse.json(
        { success: false, message: "SMS24_API_KEY manquant" },
        { status: 500 }
      );
    }

    if (contact.length === 0) {
      return NextResponse.json(
        { success: false, message: "Aucun contact/message valide" },
        { status: 400 }
      );
    }

    const response = await fetch("https://sms24.ma/api/whatsapp/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Api-key": apiKey,
      },
      body: JSON.stringify({
        contact,
      }),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch {
    return NextResponse.json(
      { success: false, message: "Erreur serveur" },
      { status: 500 }
    );
  }
}
