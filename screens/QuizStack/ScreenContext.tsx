import { PropsWithChildren, createContext, useContext, useState } from "react";
import { Quiz } from "../../types";

// Context
type QuizContextType = {
    quiz: Quiz,
    setQuiz: (quiz: Quiz) => void,
    settings: {
        propositionNumber: number,
        setPropositionNumber: (value: number) => void,
        disabledRegions: string[],
        setDisabledRegions: (value: string[]) => void,
    }
}

const QuizContext = createContext<QuizContextType>({
    quiz: {id: 0, name: "", level: 0},
    setQuiz: () => null,
    settings: {
        propositionNumber: 4,
        setPropositionNumber: () => null,
        disabledRegions: [],
        setDisabledRegions: () => null,
    }
})

export function QuizProvider({ children }: PropsWithChildren) {
    const [propositionNumber, setPropositionNumber] = useState(4)
    const [disabledRegions, setDisabledRegions] = useState<string[]>([])
    const [quiz, setQuiz] = useState<Quiz>({id: 0, name: "", level: 0})

    return (
        <QuizContext.Provider value={{
            quiz: quiz,
            setQuiz: setQuiz,
            settings: {
                propositionNumber: propositionNumber,
                setPropositionNumber: setPropositionNumber,
                disabledRegions: disabledRegions,
                setDisabledRegions: setDisabledRegions
            }
        }}>
            {children}
        </QuizContext.Provider>
    )
}

export function useQuiz() {
    return useContext(QuizContext);
}
