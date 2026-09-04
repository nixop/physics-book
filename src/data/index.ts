import { book } from './book.generated';
import { bookMeta } from './meta.generated';
import { formulas } from './formulas.generated';
import { constants } from './constants.generated';
import { lessonDetails } from './lessons.generated';

export { book, bookMeta, formulas, constants, lessonDetails };

export const allTopics = book.flatMap((chapter) => chapter.topics);

export const findChapter = (number: number) => book.find((chapter) => chapter.number === number);
export const findTopic = (id: string) => allTopics.find((topic) => topic.id === id);

export const topicPosition = (id: string) => allTopics.findIndex((topic) => topic.id === id);

export const topicNeighbors = (id: string) => {
  const position = topicPosition(id);
  return {
    previous: position > 0 ? allTopics[position - 1] : undefined,
    next: position >= 0 && position < allTopics.length - 1 ? allTopics[position + 1] : undefined,
  };
};

export const formulasForTopic = (id: string) => formulas.filter((formula) => formula.relatedTopics.includes(id));

export const chaptersByGroup = book.reduce<Record<string, typeof book>>((groups, chapter) => {
  (groups[chapter.group] ??= []).push(chapter);
  return groups;
}, {});
