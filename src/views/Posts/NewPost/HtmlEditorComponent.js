import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import {
  useFormContext,
  useController
} from "react-hook-form";

const HtmlEditorComponent = ({ name, initialValue, onFocusCb }) => {
  const { control } = useFormContext();
  const { field: { onChange, ...field } } = useController({ control, name });

  return (
    <>
      <Editor
        apiKey={"qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc"}
        {...field}
        initialValue={initialValue}
        onEditorChange={onChange}
        onFocus={onFocusCb}
        init={{
          height: 500,
          menubar: true,
          plugins: 'preview codesample a11ychecker advcode casechange export formatpainter image editimage linkchecker autolink lists checklist media mediaembed pageembed permanentpen powerpaste table advtable tableofcontents tinymcespellchecker',
          toolbar: `undo redo | formatselect | bold italic backcolor | alignleft aligncenter
          alignright alignjustify | bullist numlist outdent indent | removeformat codesample preview | help`,
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
        }}
      />
    </>
  );
};

export default HtmlEditorComponent