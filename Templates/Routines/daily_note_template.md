---
layout: center-nav
---

<%*
	const periodic_notes_settings = app.plugins.plugins["periodic-notes"].settings;

	const daily_format = periodic_notes_settings.daily.format;
	const daily_date = moment(tp.file.title, daily_format)

	const iso_week = daily_date.isoWeek()
	const iso_year = daily_date.isoWeekYear();
	const iso_month = daily_date.format("MM");
	const quarter = Math.ceil((daily_date.month() + 1) / 3);

	async function get_link(folder, filename, template) {
		const filepath = `${folder}/${filename}.md`;
		const file_exists = await tp.file.exists(filepath);
		if (!file_exists) {
			const template_file = tp.file.find_tfile(template)
			await tp.file.create_new(template_file, filename, false, folder);
		}
		return `[[${filename}]]`;
	}
	const weekly_folder = periodic_notes_settings.weekly.folder;
	const weekly_filename = `${iso_year}-W${iso_week}`;
	const weekly_template = periodic_notes_settings.weekly.template;
	tR += await get_link(weekly_folder, weekly_filename, weekly_template)
%> | <%*
	const monthly_folder = periodic_notes_settings.monthly.folder;
	const monthly_filename = `${iso_year}-${iso_month}`;
	const monthly_template = periodic_notes_settings.monthly.template;
	tR += await get_link(monthly_folder, monthly_filename, monthly_template)
%> | <%* 
	const quarterly_folder = periodic_notes_settings.quarterly.folder; 
	const quarterly_filename = `${iso_year}-Q${quarter}`; 
	const quarterly_template = periodic_notes_settings.quarterly.template; 
	tR += await get_link(quarterly_folder, quarterly_filename, quarterly_template);
%> | <%* 
	const yearly_folder = periodic_notes_settings.yearly.folder; 
	const yearly_filename = `${iso_year}`; 
	const yearly_template = periodic_notes_settings.yearly.template; 
	tR += await get_link(yearly_folder, yearly_filename, yearly_template); 
%>

<% tp.file.include("[[daily_checklist_template]]") %>
