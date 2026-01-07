// import Story from "../models/storyModel.js";
// import LifeBook from "../MODELS/LifeBook.js";
// import Groq from "groq-sdk";

// const groq = new Groq({
//   apiKey: process.env.GROQ_API_KEY,
// });

// // ADD STORY
// export const addStory = async (req, res) => {
//   try {
//     const story = new Story(req.body);
//     const savedStory = await story.save();
//     res.status(201).json(savedStory);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to add story", err });
//   }
// };

// // GET ALL STORIES
// export const getAllStories = async (req, res) => {
//   try {
//     const stories = await Story.find();
//     res.status(200).json(stories);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch stories", err });
//   }
// };

// // EDIT STORY
// export const editStory = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const updated = await Story.findByIdAndUpdate(id, req.body, { new: true });

//     if (!updated) {
//       return res.status(404).json({ message: "Story not found" });
//     }

//     res.status(200).json(updated);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to update story", err });
//   }
// };

// // DELETE STORY
// export const deleteStory = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const deleted = await Story.findByIdAndDelete(id);

//     if (!deleted) {
//       return res.status(404).json({ message: "Story not found" });
//     }

//     res.status(200).json({ message: "Deleted successfully!" });
//   } catch (err) {
//     res.status(500).json({ message: "Failed to delete story", err });
//   }
// };


// export const generateLifeBook = async (req, res) => {
//   try {
//     const userId = req.user?.id || req.query.userId;

//     if (!userId) {
//       return res.status(400).json({ message: "User ID required" });
//     }
//     //fetching memories of retired person
//     const stories = await Story.find({ userId }).sort({ date: 1 });

//     if (stories.length === 0) {
//       return res.status(400).json({
//         message: "No memories found to generate LifeBook",
//       });
//     }

  
//     const memoryText = stories
//       .map(
//         (s, i) =>
//           `Memory ${i + 1}:
// Title: ${s.title}
// Date: ${new Date(s.date).toDateString()}
// Description: ${s.description}`
//       )
//       .join("\n\n");


// //giving prompt
//     const prompt = `
// You are an empathetic biographer writing an autobiography for a retired person.

// Using the memories below, generate a warm, respectful autobiography.
// - Group memories into meaningful chapters
// - Use simple, elder-friendly language
// - Add emotional depth
// - Return output strictly in JSON format

// FORMAT:
// {
//   "chapters": [
//     { "title": "Chapter Title", "content": "Chapter text..." }
//   ]
// }

// MEMORIES:
// ${memoryText}
// `;
// //using the model
//     const completion = await groq.chat.completions.create({
//       model: "llama-3.3-70b-versatile",
//       messages: [{ role: "user", content: prompt }],
//       temperature: 0.7,
//     });

//  const aiResponse = completion.choices[0].message.content;

//     let parsedOutput;
//     try {
//       parsedOutput = JSON.parse(aiResponse);
//     } catch {
//       return res.status(500).json({
//         message: "AI response parsing failed",
//         raw: aiResponse,
//       });
//     }

//     let lifeBook = await LifeBook.findOne({ userId });

//     if (lifeBook) {
//       lifeBook.chapters = parsedOutput.chapters;
//       lifeBook.generatedFromMemories = stories.length;
//       lifeBook.lastUpdatedAt = new Date();
//       await lifeBook.save();
//     } else {
//       lifeBook = await LifeBook.create({
//         userId,
//         bookTitle: "My Life Story",
//         chapters: parsedOutput.chapters,
//         generatedFromMemories: stories.length,
//       });
//     }

//     res.status(200).json({
//       message: "LifeBook generated successfully",
//       autobiography: lifeBook,
//     });
//   } catch (error) {
//     console.error("Groq LifeBook Error:", error);
//     res.status(500).json({
//       message: "Failed to generate LifeBook",
//       error: error.message,
//     });
//   }
// };
import Story from "../MODELS/storyModel.js";
import LifeBook from "../MODELS/LifeBook.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);



export const addStory = async (req, res) => {
  try {
    const story = new Story({
      ...req.body,
      userId: req.user._id,
    });

    const savedStory = await story.save();
    res.status(201).json(savedStory);
  } catch (err) {
    res.status(500).json({ message: "Failed to add story", err });
  }
};


export const getAllStories = async (req, res) => {
  try {
    const stories = await Story.find({ userId: req.user._id }).sort({ date: 1 });
    res.status(200).json(stories);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch stories", err });
  }
};


export const editStory = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Story.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Story not found" });
    }

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update story", err });
  }
};


export const deleteStory = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Story.findOneAndDelete({
      _id: id,
      userId: req.user._id,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Story not found" });
    }

    res.status(200).json({ message: "Deleted successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete story", err });
  }
};


// export const generateLifeBook = async (req, res) => {
//   try {
//     const userId = req.user._id;

//     const stories = await Story.find({ userId }).sort({ date: 1 });

//     if (stories.length === 0) {
//       return res
//         .status(400)
//         .json({ message: "No memories found to generate LifeBook" });
//     }

//     const memoryText = stories
//       .map(
//         (s, i) => `
// Memory ${i + 1}
// Title: ${s.title}
// Date: ${new Date(s.date).toDateString()}
// Description: ${s.description}`
//       )
//       .join("\n");

  
//     const prompt = `
// You are an empathetic biographer writing an autobiography for a retired person.

// Rules:
// - Elder-friendly language
// - Emotional but respectful tone
// - Organize into chapters
// - STRICT JSON output

// FORMAT:
// {
//   "chapters": [
//     { "title": "Chapter Title", "content": "Chapter text" }
//   ]
// }

// MEMORIES:
// ${memoryText}
// `;

 
//     const completion = await groq.chat.completions.create({
//       model: "llama-3.3-70b-versatile",
//       messages: [{ role: "user", content: prompt }],
//       temperature: 0.7,
//     });

//     const parsedOutput = JSON.parse(
//       completion.choices[0].message.content
//     );

//     let lifeBook = await LifeBook.findOne({ userId });

//     if (lifeBook) {
//       lifeBook.chapters = parsedOutput.chapters;
//       lifeBook.generatedFromMemories = stories.length;
//       lifeBook.lastUpdatedAt = new Date();
//       await lifeBook.save();
//     } else {
//       lifeBook = await LifeBook.create({
//         userId,
//         bookTitle: "My Life Story",
//         chapters: parsedOutput.chapters,
//         generatedFromMemories: stories.length,
//       });
//     }

//     res.status(200).json({
//       message: "LifeBook generated successfully ",
//       autobiography: lifeBook,
//     });
//   } catch (error) {
//     console.error("Groq LifeBook Error:", error);
//     res.status(500).json({
//       message: "Failed to generate LifeBook",
//       error: error.message,
//     });
//   }
// };


export const generateLifeBook = async (req, res) => {
  try {
    const userId = req.user._id;

    const stories = await Story.find({ userId }).sort({ date: 1 });

    if (stories.length === 0) {
      return res
        .status(400)
        .json({ message: "No memories found to generate LifeBook" });
    }

    const memoryText = stories
      .map(
        (s, i) => `
Memory ${i + 1}
Title: ${s.title}
Date: ${new Date(s.date).toDateString()}
Description: ${s.description}`
      )
      .join("\n");

    const prompt = `
You are an empathetic biographer writing an autobiography for a retired person.

Rules:
- Elder-friendly language
- Emotional but respectful tone
- Organize into chapters
- STRICT JSON output

FORMAT:
{
  "chapters": [
    { "title": "Chapter Title", "content": "Chapter text" }
  ]
}

MEMORIES:
${memoryText}
`;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        temperature: 0.7,
      },
    });

    const result = await model.generateContent(prompt);
    const aiText = result.response.text();
 
aiText = aiText
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

    const parsedOutput = JSON.parse(aiText);

    let lifeBook = await LifeBook.findOne({ userId });

    if (lifeBook) {
      lifeBook.chapters = parsedOutput.chapters;
      lifeBook.generatedFromMemories = stories.length;
      lifeBook.lastUpdatedAt = new Date();
      await lifeBook.save();
    } else {
      lifeBook = await LifeBook.create({
        userId,
        bookTitle: "My Life Story",
        chapters: parsedOutput.chapters,
        generatedFromMemories: stories.length,
      });
    }

    res.status(200).json({
      message: "LifeBook generated successfully",
      autobiography: lifeBook,
    });
  } catch (error) {
    console.error("Gemini LifeBook Error:", error);
    res.status(500).json({
      message: "Failed to generate LifeBook",
      error: error.message,
    });
  }
};
