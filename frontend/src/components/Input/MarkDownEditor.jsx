import React, { memo } from "react";
import { Editor } from "@tinymce/tinymce-react";

const MarkDownEditor = ({
  label,
  value,
  changeValue,
  name,
  invalidFields,
  setInvalidFields,
}) => {
  return (
    <div className="flex flex-col">
      <span className="">{label}</span>
      <Editor
        apiKey="4z7qac15e4z9pf92ebym1mks8gxr0a1j6rj739iomhzau6o6"
        initialValue={value}
        init={{
          height: 500,
          menubar: true,
          plugins:
            "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown",
          toolbar:
            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
          tinycomments_mode: "embedded",
          tinycomments_author: "Author name",
          mergetags_list: [
            { value: "First.Name", title: "First Name" },
            { value: "Email", title: "Email" },
          ],
          ai_request: (request, respondWith) =>
            respondWith.string(() =>
              Promise.reject("See docs to implement AI Assistant")
            ),
        }}
        onChange={(e) =>
          changeValue((prev) => ({ ...prev, [name]: e.target.getContent() }))
        }
        onFocus={() => setInvalidFields && setInvalidFields([])}
      />
      {invalidFields?.some((element) => element.name === name) && (
        <small className="text-red-500 text-sm">
          {invalidFields?.find((element) => element.name === name)?.message}
        </small>
      )}
    </div>
  );
};

export default memo(MarkDownEditor);
