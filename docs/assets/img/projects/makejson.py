import os
import json

def detect_images(pid):
	hires = []
	standard = []
	thumb = []

	for image in sorted(os.listdir(pid)):
		if 'thumb' in image:
			thumb.append(image)
		if 'standard' in image:
			standard.append(image)
		if 'hires' in image:
			hires.append(image)

	return hires, standard, thumb

projects = []

for pid in sorted(os.listdir('.')):
	if not os.path.isdir(pid):
		continue

	project = {
		'id': pid,
		'name': pid,
                'rooms': ['Soggiorno', 'Bagno'],
		'images': { 'renders': [] }
	}

	hires, standard, thumb = detect_images(pid)

	project['images']['thumb'] = os.path.join('assets/img/projects', pid, thumb[0])

	for i in range(0, len(hires)):
		project['images']['renders'].append({
			'hires': os.path.join('assets/img/projects', pid, hires[i]),
			'standard': os.path.join('assets/img/projects', pid, standard[i]),
			'thumb': os.path.join('assets/img/projects', pid, thumb[i])
		})

	projects.append(project)

print(json.dumps(projects, indent=4))
