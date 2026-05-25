/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Initialize Gemini SDK with telemetry header
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
} else {
  console.warn("⚠️ Warning: GEMINI_API_KEY is not defined in environment. AI Assistant will operate in simulation mode.");
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Use JSON bodyParser
  app.use(express.json());

  // API Route: AI Assistant
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Некоректний формат повідомлень" });
      }

      // Format last context or previous chat history
      const formattedHistory = messages.map((m: any) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      }));

      const systemInstruction = `Ти — висококваліфікований та чуйний інтелектуальний помічник Харківського метрополітену (Харківський Метро-Помічник). Твоя мета — підтримувати користувачів, надавати корисну інформацію про розклад, безпеку, укриття та маршрути метро.
Відповідай виключно українською мовою. Тон має бути теплим, ввічливим, спокійним та підбадьорливим, висловлюючи підтримку мужньому та героїчному місту Харків та його мешканцям.

Важливі факти про Метро Харкова:
1. Лінії та пересадки: У метро 3 лінії: Холодногірсько-Заводська (Червона), Салтівська (Синя), Олексіївська (Зелена). Пересадкові вузли в центрі утворюють трикутник:
   - Майдан Конституції (Червона) <-> Історичний музей (Синя)
   - Університет (Синя) <-> Держпром (Зелена)
   - Спортивна (Червона) <-> Метробудівників (Зелена)
2. Графік роботи: Працює щоденно з 05:30 до 21:30 (час може коригуватися у разі зміни комендантської години). Інтервали поїздів становлять від 6-7 хвилин у пікові години до 11-12 хвилин у позапікові.
3. Безпека та укриття: Метро функціонує як надійне цілодобове бомбосховище. Під час повітряних тривог станції відчинені як укриття. Поїзди курсують за звичайним графіком (крім випадків блекауту чи надзвичайних влучань, тоді першочергово гарантується укриття).
4. Метрошкола (Underground School): На станціях «Університет», «Перемога» та «Академіка Барабашова» обладнано спеціальні підземні кабінети для навчання харківських школярів різного віку в абсолютно безпечних, звукоізольованих та вентильованих умовах. На станції «Університет» також діє підземний дитячий садок.
5. Найглибша станція: «Ярослава Мудрого» (колишня Пушкінська), її глибина сягає понад 35 метрів, що робить її найбезпечнішим укриттям у центральній частині міста. Вона відома розкішною архітектурою з білими арками та унікальними люстрами.
6. Нещодавні перейменування (2024 рік):
   - Проспект Гагаріна -> Левада
   - Пушкінська -> Ярослава Мудрого
   - Героїв Праці -> Салтівська
   - Завод імені Малишева -> Заводська

Будь ласка, якщо користувач питає про маршрут з однієї станції на іншу, підкажи де зробити пересадку, скільки станцій проїхати та приблизний час (використовуючи ці факти, середня тривалість перегону — близько 2.5 хвилин). Наприклад, шлях від Холодної Гори до Салтівської: їхати по Червоній лінії до Майдану Конституції, перейти на Історичний Музей, і далі по Синій лінії їхати до кінцевої станції Салтівська (Героїв Праці).`;

      if (!ai) {
        // Fallback simulated response if no API key is provided
        const lastMsg = messages[messages.length - 1]?.text || "";
        let reply = "Вітаю! Я працюю у демо-режимі (API-ключ не налаштовано в Secrets). Kharkiv Metro є гордістю нашого міста! Під час повітряної тривоги всі станції працюють як бомбосховища. Станції «Університет», «Перемога» та «Академіка Барабашова» мають безпечні класи «Метрошколи». Якщо у вас є питання про пересадки чи розклад, я спробую відповісти на базі вбудованих даних!";
        
        const textLower = lastMsg.toLowerCase();
        if (textLower.includes("школ") || textLower.includes("клас") || textLower.includes("навчан")) {
          reply = "Так! У Харкові створено унікальну «Метрошколу». Вона розташована на станціях «Університет», «Перемога» та «Академіка Барабашова». Там понад 1000 учнів навчаються в безпечних, сучасних, комфортних класах з відмінною звукоізоляцією та вентиляцією.";
        } else if (textLower.includes("глиб") || textLower.includes("мудр") || textLower.includes("пушкін")) {
          reply = "Найглибшою станцією харківського метрополітену є «Ярослава Мудрого» (колишня назва «Пушкінська»). Її глибина становить близько 35 метрів. Вона надзвичайно безпечна та красива.";
        } else if (textLower.includes("тривог") || textLower.includes("укритт") || textLower.includes("сховищ")) {
          reply = "Харківський метрополітен працює цілодобово як укриття. Під час повітряної тривоги рух поїздів на лініях зазвичай продовжується, а всі підземні вестибюлі та платформи приймають людей для безпечного перебування. На станціях є питна вода, біотуалети, пункти обігріву та зарядки.";
        } else if (textLower.includes("пересадк") || textLower.includes("як доїхати") || textLower.includes("маршрут")) {
          reply = "Для планування маршрутів ви можете скористатися нашою вкладкою «Калькулятор Маршрутів» зверху. У центрі міста діють 3 пересадки: Майдан Конституції <-> Історичний музей, Університет <-> Держпром, Спортивна <-> Метробудівників. Середній час між сусідніми станціями — 2.5 хвилини.";
        }

        return res.json({ text: reply });
      }

      // Call Gemini 3.5 Flash
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: formattedHistory,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      });

      const replyText = response.text || "Вибачте, сталася помилка при отриманні відповіді.";
      return res.json({ text: replyText });

    } catch (err: any) {
      console.error("Gemini Error:", err);
      return res.status(500).json({ error: `Помилка сервісу помічника: ${err.message}` });
    }
  });

  // API Route: Get simulated real-time schedule adjustments / alert
  app.get("/api/status", (req, res) => {
    res.json({
      airRaidAlertActive: true, // Kharkiv often has active status, let's keep it visible with a safety banner
      curfewHours: "23:00 - 05:00",
      powerGridStatus: "Стабільна (автономні генератори підключено)",
      simulatedActiveHour: new Date().toISOString(),
      announcements: [
        {
          id: "1",
          type: "warning",
          title: "Повітряна тривога",
          message: "У місті оголошено повітряну тривогу. Метрополітен працює в режимі перевезення та цілодобового укриття. Просимо зберігати спокій.",
          timestamp: "Щойно"
        },
        {
          id: "2",
          type: "info",
          title: "Метрошкола активна",
          message: "Нагадуємо, на станціях «Університет», «Перемога» та «Академіка Барабашова» проходять навчальні заняття. Дотримуйтесь тиші біля безпечних зон.",
          timestamp: "Сьогодні"
        }
      ]
    });
  });

  // Mount Vite middleware or static files
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
