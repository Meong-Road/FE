import React from "react";

import { Form } from "../Form";

export default function QuickDateTimeField() {
  return (
    <Form.Field
      name="dateTime"
      render={({ field: { value, onChange } }) => (
        <Form.Item className="flex-1">
          <Form.Label required className="text-lg font-semibold">
            모임 시간
          </Form.Label>
          <Form.Control>
            <div className="flex gap-4">
              <Form.Select
                name="hour"
                value={value.hour ?? ""}
                placeholder="시"
                options={Array.from({ length: 24 }, (_, i) => i + 1)}
                onChange={(e) => {
                  const hour =
                    e.target.value === ""
                      ? undefined
                      : parseInt(e.target.value, 10);
                  onChange({ ...value, hour });
                }}
                className="flex-1 rounded-xl bg-[#edf4fb] px-4 py-2.5"
              />
              <Form.Select
                name="minute"
                value={value.minute ?? ""}
                placeholder="분"
                options={Array.from({ length: 60 }, (_, i) => i + 1)}
                onChange={(e) => {
                  const minute =
                    e.target.value === ""
                      ? undefined
                      : parseInt(e.target.value, 10);
                  onChange({ ...value, minute });
                }}
                className="flex-1 rounded-xl bg-[#edf4fb] px-4 py-2.5"
              />
            </div>
          </Form.Control>
          <Form.Message />
        </Form.Item>
      )}
    />
  );
}
