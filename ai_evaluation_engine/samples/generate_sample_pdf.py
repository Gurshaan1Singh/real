#!/usr/bin/env python3
"""
Simple Pure-Python PDF Generator
Generates a multi-page PDF from sample_pitch_deck.txt for immediate testing.
"""

import os
import re

def escape_pdf_str(text):
    return text.replace('\\', '\\\\').replace('(', '\\(').replace(')', '\\)')

def text_to_pdf(input_txt_path, output_pdf_path):
    with open(input_txt_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Split slides by separator
    raw_slides = [s.strip() for s in content.split('================================================================================') if s.strip()]

    objects = []
    
    # 1: Font
    font_id = 1
    objects.append(b"1 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n")

    page_ids = []
    current_id = 2

    page_content_pairs = []

    for slide in raw_slides:
        lines = slide.split('\n')
        
        # Build PDF stream
        stream_parts = ["BT", "/F1 11 Tf", "14 TL", "40 750 Td"]
        
        for line in lines:
            line_clean = line.strip()
            if not line_clean:
                stream_parts.append("T*")
                continue
            if line_clean.startswith("SLIDE"):
                stream_parts.append("/F1 14 Tf")
                stream_parts.append(f"({escape_pdf_str(line_clean)}) Tj")
                stream_parts.append("T*")
                stream_parts.append("/F1 11 Tf")
            else:
                # Wrap long lines
                while len(line_clean) > 80:
                    stream_parts.append(f"({escape_pdf_str(line_clean[:80])}) Tj")
                    stream_parts.append("T*")
                    line_clean = line_clean[80:]
                stream_parts.append(f"({escape_pdf_str(line_clean)}) Tj")
                stream_parts.append("T*")
        
        stream_parts.append("ET")
        stream_data = "\n".join(stream_parts).encode('latin1')
        
        content_obj_id = current_id
        current_id += 1
        page_obj_id = current_id
        current_id += 1

        content_obj = f"{content_obj_id} 0 obj\n<< /Length {len(stream_data)} >>\nstream\n".encode('ascii') + stream_data + b"\nendstream\nendobj\n"
        objects.append(content_obj)
        page_content_pairs.append((page_obj_id, content_obj_id))
        page_ids.append(page_obj_id)

    # Pages object
    pages_obj_id = current_id
    current_id += 1

    kids_str = " ".join(f"{pid} 0 R" for pid in page_ids)
    pages_obj = f"{pages_obj_id} 0 obj\n<< /Type /Pages /Kids [{kids_str}] /Count {len(page_ids)} >>\nendobj\n".encode('ascii')
    objects.append(pages_obj)

    # Page objects
    for page_obj_id, content_obj_id in page_content_pairs:
        page_obj = f"{page_obj_id} 0 obj\n<< /Type /Page /Parent {pages_obj_id} 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 1 0 R >> >> /Contents {content_obj_id} 0 R >>\nendobj\n".encode('ascii')
        objects.append(page_obj)

    # Catalog object
    catalog_obj_id = current_id
    current_id += 1
    catalog_obj = f"{catalog_obj_id} 0 obj\n<< /Type /Catalog /Pages {pages_obj_id} 0 R >>\nendobj\n".encode('ascii')
    objects.append(catalog_obj)

    # Assemble PDF
    out = bytearray(b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n")
    offsets = [0]
    
    # Sort objects by ID for standard xref table
    # Simple assembly:
    offset_map = {}
    
    for obj in objects:
        match = re.match(rb'^(\d+)\s+0\s+obj', obj)
        if match:
            obj_num = int(match.group(1))
            offset_map[obj_num] = len(out)
        out.extend(obj)

    xref_start = len(out)
    num_objects = max(offset_map.keys()) + 1
    out.extend(f"xref\n0 {num_objects}\n0000000000 65535 f \n".encode('ascii'))
    
    for i in range(1, num_objects):
        off = offset_map.get(i, 0)
        out.extend(f"{off:010d} 00000 n \n".encode('ascii'))

    out.extend(f"trailer\n<< /Size {num_objects} /Root {catalog_obj_id} 0 R >>\nstartxref\n{xref_start}\n%%EOF\n".encode('ascii'))

    with open(output_pdf_path, 'wb') as f:
        f.write(out)
    print(f"Generated PDF with {len(page_ids)} pages at: {output_pdf_path}")

if __name__ == "__main__":
    src = "/home/gurshaan/.gemini/antigravity/scratch/ai_evaluation_engine/samples/sample_pitch_deck.txt"
    dst = "/home/gurshaan/.gemini/antigravity/scratch/ai_evaluation_engine/samples/sample_pitch_deck.pdf"
    text_to_pdf(src, dst)
