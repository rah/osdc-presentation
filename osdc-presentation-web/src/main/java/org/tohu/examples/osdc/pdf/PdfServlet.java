/*
 * Copyright 2009 Solnet Solutions Limited (http://www.solnetsolutions.co.nz)
 */

package org.tohu.examples.osdc.pdf;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.tohu.util.QueryHelper;
import org.drools.runtime.StatefulKnowledgeSession;

import com.lowagie.text.Document;
import com.lowagie.text.DocumentException;
import com.lowagie.text.Paragraph;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;

import drools.rex.ExecutionServerHelper;

/**
 * Example of how you could extract the questions and their answers out. This calls the execution server and uses the output to
 * generate a simple PDF.
 * 
 * @author Damon Horrell
 */
public class PdfServlet extends HttpServlet {

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		StatefulKnowledgeSession knowledgeSession = new ExecutionServerHelper(request.getSession()).getKnowledgeSession();
		Map<String, Object> answers = new QueryHelper(knowledgeSession).getAnswers();
		try {
			Document document = new Document();
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			PdfWriter.getInstance(document, baos);
			document.open();
			Paragraph title = new Paragraph("OSDC PRESENTATION");
			title.setAlignment("center");
			document.add(title);
			document.add(new Paragraph(" "));
			PdfPTable table = new PdfPTable(2);
			for (Map.Entry<String, Object> entry : answers.entrySet()) {
				table.addCell(entry.getKey());
				table.addCell(entry.getValue().toString());
			}
			document.add(table);
			document.add(new Paragraph(" "));
			document.add(new Paragraph(new SimpleDateFormat("dd/MM/yyyy HH:mm").format(Calendar.getInstance().getTime())));
			document.close();
			response.setContentType("application/pdf");
			response.setContentLength(baos.size());
			ServletOutputStream out = response.getOutputStream();
			baos.writeTo(out);
			out.flush();
		} catch (DocumentException e) {
			throw new ServletException(e);
		}
	}

}
