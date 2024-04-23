import "./globals.css";

export const metadata = {
  title: "Sorting Visualization",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <header className="container py-4">
          <h1>Sorting Visualization</h1>
        </header>
        {children}
      </body>
    </html>
  )
}
