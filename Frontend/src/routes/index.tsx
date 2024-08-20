import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: () => (
    <div>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-4xl font-semibold">Welcome to MyFlashcard</div>
        <div className="text-2xl">A flashcard app for everyone</div>
      </div>
    </div>
  )
})