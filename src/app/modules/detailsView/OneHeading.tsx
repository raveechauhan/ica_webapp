import type { ProgramStructuredData } from "@/utils/interface/interface"
import type React from "react"

function isProgramStructuredDataArray(data: unknown): data is ProgramStructuredData[] {
  return Array.isArray(data) && data.length > 0 && "title" in data[0]
}

const OneHeading: React.FC<{ data: unknown }> = ({ data }) => {
  if (!data || !isProgramStructuredDataArray(data)) {
    return <div>No data available</div>
  }

  return (
    <div className="flex flex-col gap-6">
      {data.map((item, index) => {
        return (
          <div key={index} className="flex flex-col gap-4">
            <div className="text-xl font-semibold">{item.title}</div>
            <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
              {item?.topics?.map((topic, topicIndex) => {
                return (
                  <li className="ml-2" key={topicIndex}>
                    {topic}
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}
    </div>
  )
}

export default OneHeading
