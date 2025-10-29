import React from "react";

import { Form } from "../Form";
import Calendar24 from "../ui/calendar-24";

export default function QuickDateTimeField() {
  return (
    <Form.Field
      name="dateTime"
      render={({ field }) => {
        return (
          <Form.Item className="flex-1">
            <Form.Label required className="text-lg font-semibold">
              모임 날짜 및 시간
            </Form.Label>
            <Form.Control>
              <Calendar24 value={field.value} onChange={field.onChange} />
            </Form.Control>
            <Form.Message />
          </Form.Item>
        );
      }}
    />
  );
}
