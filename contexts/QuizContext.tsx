import { PropsWithChildren, createContext, useContext, useState } from "react";
import { Quiz } from "../types";

// Context
type QuizContextType = {
    quiz: Quiz,
    setQuiz: (quiz: Quiz) => void,
    settings: {
        propositionNumber: number,
        setPropositionNumber: (value: number) => void,
        excludeData: string[],
        setExcludeData: (value: string[]) => void,
    }
}

const QuizContext = createContext<QuizContextType>({
    quiz: {id: 0, name: "", level: 0},
    setQuiz: () => null,
    settings: {
        propositionNumber: 4,
        setPropositionNumber: () => null,
        excludeData: [],
        setExcludeData: () => null,
    }
})

export function QuizProvider({ children }: PropsWithChildren) {
    const [propositionNumber, setPropositionNumber] = useState(4)
    const [excludeData, setExcludeData] = useState<string[]>([])
    const [quiz, setQuiz] = useState<Quiz>({id: 0, name: "", level: 0})

    return (
        <QuizContext.Provider value={{
            quiz: quiz,
            setQuiz: setQuiz,
            settings: {
                propositionNumber: propositionNumber,
                setPropositionNumber: setPropositionNumber,
                excludeData: excludeData,
                setExcludeData: setExcludeData
            }
        }}>
            {children}
        </QuizContext.Provider>
    )
}

export function useQuiz() {
    return useContext(QuizContext);
}
